import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Live } from './live.entity';
import { User } from './user.entity';

@Entity()
export class ViewHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.viewHistories, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Live, (live) => live.viewHistories, { onDelete: 'CASCADE' })
  live: Live;
}
