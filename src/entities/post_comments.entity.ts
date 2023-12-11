import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class postComments {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'integer', nullable: false })
  user_id: number;

  @Column({ type: 'integer', nullable: false })
  post_id: number;

  @Column({ type: 'integer', nullable: true })
  parent_comment_id : string;

  @Column({ type: 'varchar', length: 500 , nullable: false })
  content: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
  
  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}