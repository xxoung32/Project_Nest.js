import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class posts {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'integer', nullable: false })
  user_id: number;

  @Column({ type: 'varchar', length: 50 , nullable: false })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn({ type: 'datetime'})
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime'})
  updated_at: Date;
  
}