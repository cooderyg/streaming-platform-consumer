import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Notice } from './notice.entity';
import { User } from './user.entity';

@Entity()
export class NoticeComment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Notice, (notice) => notice.noticeComment, {
    onDelete: 'CASCADE',
  })
  notice: Notice;

  @ManyToOne(() => User, (user) => user.noticeComment, {
    onDelete: 'CASCADE',
  })
  user: User;
}
