import { Job } from 'bull';

export interface ISendMailProcessJob extends Job {
  data: {
    email: string;
    randomNumber: number;
  };
}
