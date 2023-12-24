import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { accounts } from './accounts.entity';
import { userShare } from './user_share.entity';
import { type } from 'os';

@Entity()
export class users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 13, nullable: false })
  phone_number: string;

  @Column({ type: 'varchar', length: 10, nullable: false })
  birth: string;

  @Column({ type: 'varchar', length: 10, nullable: false })
  gender: string;

  @Column({ type: 'integer', nullable: true })
  user_share_id: number;

  @Column({ type: 'integer', nullable: true })
  share_host_id: number;

  @Column({ type: 'tinyint', width: 1, nullable: false })
  subscription_state: number;

  @Column({ type: 'integer', width: 1, nullable: false, default: 0 })
  status: number;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;

  @OneToMany((type) => accounts, (account) => account.user)
  accounts: accounts[];

  // One-to-Many relationship with UserShare
  @OneToMany((type) => userShare, (userShare) => userShare.user)
  userShares: userShare[];
}
