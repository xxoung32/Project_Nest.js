import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { postImages } from "./post_images.entity";

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

  @OneToMany(() => postImages, postImage => postImage.post)
  post_images: postImages;
}