import { Process, Processor } from '@nestjs/bull';
import { HttpException, Logger } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { IAddAlertQueueJob } from './interfaces/alerts-consumer.interface';

@Processor('alertsQueue')
export class AlertsConsumer {
  constructor(private readonly alertsService: AlertsService) {}
  private readonly logger = new Logger(AlertsConsumer.name);

  @Process('addAlertQueue')
  async addAlertQueue(job: IAddAlertQueueJob): Promise<void> {
    this.logger.debug('대기열 큐가 실행되었습니다.');
    try {
      const { channelId, channelName, users } = job.data;
      await this.alertsService.createAlerts({
        users,
        channelId,
        isOnAir: true,
        channelName,
      });
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
