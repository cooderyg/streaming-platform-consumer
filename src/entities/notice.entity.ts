import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Channel } from './channel.entity';
import { NoticeComment } from './notice-comment.entity';

@Entity()
export class Notice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @Column()
  imageUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => NoticeComment, (noticeComment) => noticeComment.notice, {
    cascade: true,
  })
  noticeComment: NoticeComment[];

  @ManyToOne(() => Channel, (channel) => channel.notices, {
    onDelete: 'CASCADE',
  })
  channel: Channel;
}
