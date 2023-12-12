import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class incomes extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ type: 'integer', nullable: false })
  user_id: number;

  @Column({ type: 'integer', nullable: false })
  income_category_id: number;

  @Column({ type: 'integer', nullable: false })
  amount: number;

  @Column({ type: 'varchar', length: 300, nullable: true})
  memo: string;

  @Column({ type: 'date'})
  date: Date;

  @CreateDateColumn({ type: 'datetime'})
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime'})
  updated_at: Date;
}