import { Process, Processor } from '@nestjs/bull';
import { MailsService } from './mails.service';
import { ISendMailProcessJob } from './interfaecs/mails-consumer.interface';
import { HttpException, Logger } from '@nestjs/common';

@Processor('mailsQueue')
export class MailsConsumer {
  constructor(private readonly mailsService: MailsService) {}
  private readonly logger = new Logger(MailsConsumer.name);
  @Process('sendMailProcess')
  async sendMailProcess(job: ISendMailProcessJob): Promise<void> {
    this.logger.debug('대기열 mailQueue가 실행되었습니다.');
    try {
      const { email, randomNumber } = job.data;
      await this.mailsService.sendEmail({ email, randomNumber });
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
