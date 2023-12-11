import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { users } from "./users.entity";

@Entity()
export class accounts extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', nullable: false })
  user_id: number;

  @Column({ type: 'varchar', length: 20, nullable: false })
  account_uid: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  provider: string;

  @Column({ type: 'varchar', length: 20, nullable: false, default: 0, unique: true })
  ci: string

  @CreateDateColumn({ type: 'timestamp', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(type => users, user => user.accounts, { eager: true })
  user: users;
}