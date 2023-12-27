import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { postComments } from './post_comments.entity';

@Entity()
export class posts {
  static created_at: any;
  static content: any;
  static title: any;
  static user_id: any;
  static id: any;
  static map(
    arg0: (post: any) => {
      Posts_id: any;
      Posts_user_id: any;
      Posts_title: any;
      Posts_content: any;
      Posts_created_at: any;
      Post_images_post_id: any;
      Posts_images_url: any;
    },
  ) {
    throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', nullable: false })
  user_id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn({ type: 'datetime'})
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;
}
