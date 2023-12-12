import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class postImages {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'integer', nullable: false })
  post_id: number;

  @Column({ type: 'varchar', length: 2000 , nullable: false })
  url : string;

  @CreateDateColumn({ type: 'datetime'})
  created_at: Date;
  
  @UpdateDateColumn({ type: 'datetime'})
  updated_at: Date;
}