import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class postComments {
  @PrimaryGeneratedColumn()
  id: number 

  @Column({ type: 'integer', nullable: false })
  user_id: number;

  @Column({ type: 'integer', nullable: false })
  post_id: number;

  // @Column({ type: 'integer', nullable: true })
  // parent_comment_id : string;
  @ManyToOne(() => postComments, {nullable: true})
  @JoinColumn({ name: 'parent_comment_id' })
  parentComment: postComments; //부모 댓글 ID
  
  @Column({ type: 'varchar', length: 500 , nullable: false })
  content: string; //댓글 내용

  @Column({ default: false })
  isCommentForComment: boolean; // 대댓글 여부

  @Column({ type: 'timestamp', nullable: true })
  deletedTime: Date; //삭제시간

  @Column({ default: false })
  deletedTrue: boolean; //삭제 여부

  @Column({ default: 0 })
  depth: number; //댓글의 깊이

  @Column({ default: 0 })
  orderNumber: number; //댓글의 순서

  @CreateDateColumn({ type: 'datetime'})
  created_at: Date;
  
  @UpdateDateColumn({ type: 'datetime'})
  updated_at: Date;
}