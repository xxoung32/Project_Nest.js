import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { posts } from './posts.entity';

@Entity()
export class postComments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', nullable: false })
  user_id: number;

  @Column({ type: 'integer', nullable: false })
  post_id: number;

  @Column({ type: 'varchar', length: 500, nullable: false })
  content: string; //댓글 내용

  @ManyToOne(() => posts, (post) => post.comments, { onDelete: 'CASCADE' }) // 추가
  @JoinColumn({ name: 'post_id' }) // 추가
  post: posts; // 추가

  @ManyToOne(() => postComments, (comment) => comment.children)
  @JoinColumn({ name: 'parent_id' })
  parent: postComments;

  @OneToMany(() => postComments, (comment) => comment.parent)
  children: postComments[];

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date | null;
}
