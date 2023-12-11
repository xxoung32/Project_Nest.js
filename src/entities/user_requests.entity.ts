import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class userRequests extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 30 , nullable: false })
  email: string

  @Column({ type: 'varchar', length: 20 , nullable: false })
  acconut_uid: string

  @Column({ type: 'varchar', length: 20 , nullable: false })
  name: string

  @Column({ type: 'varchar', length: 13 , nullable: false })
  phone_number: string

  @Column({ type: 'varchar', length: 10 , nullable: false })
  birth: string

  @Column({ type: 'integer', nullable: false })
  provider: number

  @Column({ type: 'tinyint', width: 1, nullable: false, default: 0 })
  is_completed: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

}