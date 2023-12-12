import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class monthlyBudgets {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'integer', nullable: false })
  amount: number;

  @CreateDateColumn({ type: 'datetime'})
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime'})
  updated_at: Date;
}