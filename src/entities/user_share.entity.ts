import { type } from 'os';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { users } from './users.entity';
import { shares } from './shares.entity';

@Entity()
export class userShare extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', nullable: false })
  user_id: number;

  @Column({ type: 'integer', nullable: false })
  share_id: number;

  @Column({ type: 'integer', nullable: false })
  status: number;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;

  @ManyToOne((type) => users, (user) => user.userShares, { eager: true })
  user: users;

  @ManyToOne((type) => shares, (share) => share.userShares, { eager: true })
  share: shares;
}
