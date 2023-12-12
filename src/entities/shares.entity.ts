import { type } from "os";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { userShare } from "./user_share.entity";

@Entity()
export class shares extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', nullable: false })
  host_id: number;

  @CreateDateColumn({ type: 'datetime'})
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime'})
  updated_at: Date;

  @OneToMany(type => userShare, userShare => userShare.share)
  userShares: userShare[];

}