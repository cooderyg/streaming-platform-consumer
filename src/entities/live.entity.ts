import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CreditHistory } from './credit-history.entity';
import { ViewHistory } from './view-history.entity';
import { Chat } from './chat.entity';
import { Channel } from './channel.entity';
import { Tag } from './tag.entity';

@Entity()
export class Live {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  endDate: Date;

  @Column({ nullable: true })
  income: number;

  @Column({ nullable: true })
  replayUrl: string;

  @Column({ default: false })
  onAir: boolean;

  @Column({ nullable: true })
  thumbnailUrl: string;

  @Column({ nullable: true })
  playtime: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => CreditHistory, (creditHistory) => creditHistory.live, {
    cascade: true,
  })
  creditHistories: CreditHistory[];

  @OneToMany(() => ViewHistory, (viewHistory) => viewHistory.live, {
    cascade: true,
  })
  viewHistories: ViewHistory[];

  @OneToMany(() => Chat, (chat) => chat.live, { cascade: true })
  chats: Chat[];

  @ManyToOne(() => Channel, (channel) => channel.lives, { onDelete: 'CASCADE' })
  channel: Channel;

  @JoinTable({ name: 'live_tag' })
  @ManyToMany(() => Tag, (tag) => tag.lives)
  tags: Tag[];
}
