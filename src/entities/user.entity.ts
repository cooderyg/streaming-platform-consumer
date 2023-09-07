import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Alert } from './alerts.entity';
import { NoticeComment } from './notice-comment.entity';
import { Chat } from './chat.entity';
import { ViewHistory } from './view-history.entity';
import { CreditHistory } from './credit-history.entity';
import { Subscribe } from './subscribe.entity';
import { Payment } from './payment.entity';
import { Interest } from './interest.entity';
import { Channel } from './channel.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  nickname: string;

  @Column({ default: 0 })
  credit: number;

  @Column({ nullable: true })
  imageUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToOne(() => Channel, (channel) => channel.user, { cascade: true })
  channel: Channel;

  @OneToMany(() => Interest, (interest) => interest.user, { cascade: true })
  interests: Interest[];

  @OneToMany(() => Payment, (payment) => payment.user, { cascade: true })
  payments: Payment[];

  @OneToMany(() => Subscribe, (subscribe) => subscribe.user, { cascade: true })
  subscribes: Subscribe[];

  @OneToMany(() => CreditHistory, (creditHistory) => creditHistory.user, {
    cascade: true,
  })
  creditHistories: CreditHistory[];

  @OneToMany(() => ViewHistory, (viewHistory) => viewHistory.user, {
    cascade: true,
  })
  viewHistories: ViewHistory[];

  @OneToMany(() => Chat, (chat) => chat.user, {
    cascade: true,
  })
  chats: Chat[];

  @OneToMany(() => NoticeComment, (noticeComment) => noticeComment.user, {
    cascade: true,
  })
  noticeComment: NoticeComment[];

  @OneToMany(() => Alert, (alert) => alert.user, {
    cascade: true,
  })
  alerts: Alert[];
}
