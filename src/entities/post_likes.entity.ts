import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class postLikes {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'integer', nullable: false })
  user_id: number;

  @Column({ type: 'integer', nullable: false })
  post_id: number;

  @CreateDateColumn({ type: 'datetime'})
  created_at: Date;
  
  @UpdateDateColumn({ type: 'datetime'})
  updated_at: Date;
}