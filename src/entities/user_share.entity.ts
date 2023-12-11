import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

  @CreateDateColumn({ type: 'timestamp', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

}