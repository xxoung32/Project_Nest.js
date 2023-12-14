import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { posts } from "./posts.entity";

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
  
  @ManyToOne(() => posts, post => post.post_images, {eager:true})
  @JoinColumn({ name: 'post_id' })
  post:posts
    length: number;
}