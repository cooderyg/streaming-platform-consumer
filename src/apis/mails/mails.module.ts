import { Module } from '@nestjs/common';
import { MailsService } from './mails.service';
import { MailsConsumer } from './mails.consumer';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [BullModule.registerQueue({ name: 'mailsQueue' })],
  providers: [MailsService, MailsConsumer],
})
export class MailsModule {}
