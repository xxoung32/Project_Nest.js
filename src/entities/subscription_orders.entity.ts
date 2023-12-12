import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class subscription_orders {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'integer', nullable: false })
  user_id: number;

  @Column({ type: 'integer', nullable: false })
  amount: number;

  @Column({ type: 'varchar', length: 10 , nullable: false })
  provider: string;

  @Column({ type: 'boolean', default: true, nullable: false })
  status: boolean;

  @CreateDateColumn({ type: 'datetime'})
  created_at: Date;
  
  @UpdateDateColumn({ type: 'datetime'})
  updated_at: Date;
}