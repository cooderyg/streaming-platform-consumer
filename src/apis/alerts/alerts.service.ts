import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Alert } from 'src/entities/alerts.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlertsService {
  constructor(
    @InjectRepository(Alert)
    private readonly alertsRepository: Repository<Alert>,
  ) {}

  async createAlerts({
    users,
    isOnAir,
    channelId,
    channelName,
    noticeContent,
  }: IAlertsServiceCreateAlerts): Promise<void> {
    const temp: Alert[] = [];
    console.log(users);
    users.forEach((user) => {
      const alert = this.alertsRepository.create({
        user: { id: user.id },
        channel: { id: channelId },
        message: isOnAir
          ? `${channelName} 채널이 방송을 시작했습니다.`
          : `${channelName} 채널의 공지: ${noticeContent}`,
      });
      temp.push(alert);
    });

    await this.alertsRepository.insert(temp);
  }
}

export interface IAlertsServiceCreateAlerts {
  users: User[];
  isOnAir: boolean;
  channelId: string;
  channelName: string;
  noticeContent?: string;
}
