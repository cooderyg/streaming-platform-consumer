import { Module } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alert } from 'src/entities/alerts.entity';
import { BullModule } from '@nestjs/bull';
import { AlertsConsumer } from './alerts.consumer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Alert]),
    BullModule.registerQueue({ name: 'alertsQueue' }),
  ],
  providers: [AlertsService, AlertsConsumer],
})
export class AlertsModule {}
