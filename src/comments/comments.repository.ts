//comments.repository.ts
import { Injectable } from '@nestjs/common';
import { postComments } from 'src/entities/post_comments.entity';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { CreateCommentsDto } from './dto/createComments.dto';
// import { posts } from 'src/entities/posts.entity';

@Injectable()
export class CommentRepository extends Repository<postComments> {
  constructor(dataSource: DataSource) {
    super(postComments, dataSource.createEntityManager());
  }

  async createComment(commentInfo: CreateCommentsDto) {
    const newComment = this.create({
      user_id: commentInfo.userId,
      post_id: commentInfo.postId,
      content: commentInfo.content,
      parent: commentInfo.parent !== undefined ? commentInfo.parent : null,
    } as DeepPartial<postComments>);
    await this.save(newComment);
    return newComment;
  }

  async getCommentsAndReplies(postId: number): Promise<any[]> {
    const commentsList = await this.find({
      where: { post_id: postId, deleted_at: null },
      relations: ['post', 'children', 'parent'],
    });

    const formattedComments = commentsList
      .filter((comment) => !comment.parent)
      .map((comment) => ({
        id: comment.id,
        user_id: comment.user_id,
        post_id: comment.post_id,
        content: comment.content,
        deleted_at: comment.deleted_at,
        created_at: comment.created_at.toLocaleDateString(),
        updated_at: comment.updated_at.toLocaleDateString(),
        replies: this.formatReplies(comment.children),
      }));

    return formattedComments;
  }

  private formatReplies(replies: postComments[]): any[] {
    if (!replies) {
      return [];
    }

    const formattedReplies: any[] = [];

    replies.forEach((reply) => {
      formattedReplies.push({
        id: reply.id,
        user_id: reply.user_id,
        post_id: reply.post_id,
        content: reply.content,
        deleted_at: reply.deleted_at,
        created_at: reply.created_at.toLocaleDateString(),
        updated_at: reply.updated_at.toLocaleDateString(),
        replies: this.formatReplies(reply.children),
      });
    });
    return formattedReplies;
  }
}
