import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class expenses {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'integer', nullable: false })
  user_id: number;

  @Column({ type: 'integer', nullable: false })
  expenses_category_id: number;

  @Column({ type: 'integer', nullable: false })
  amount: number;

  @Column({ type: 'varchar', length: 300 , nullable: true })
  memo: number;

  @Column({ type: 'date'})
  date: Date;

  @CreateDateColumn({ type: 'datetime'})
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime'})
  updated_at: Date;
  
}