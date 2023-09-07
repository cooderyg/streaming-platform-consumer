import { Job } from 'bull';
import { User } from 'src/entities/user.entity';

export interface IAddAlertQueueJob extends Job {
  data: {
    channelId: string;
    channelName: string;
    users: User[];
  };
}
