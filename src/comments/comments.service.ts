//comments.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommentsDto } from './dto/createComments.dto';
import { CommentRepository } from './comments.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { PostRepository } from 'src/posts/posts.repository';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { postComments } from 'src/entities/post_comments.entity';
import { updateCommentsDto } from './dto/updateComments.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentRepository)
    private commentRepository: CommentRepository,
    @InjectRepository(PostRepository)
    private postRepository: PostRepository,
  ) {}

  async createComment(commentInfo: CreateCommentsDto): Promise<postComments> {
    // 게시글 존재 여부와 게시 상태 확인
    const existingPost = await this.postRepository.findOne({
      where: { id: commentInfo.postId },
    });

    if (!existingPost) {
      throw new NotFoundException(
        `ID ${commentInfo.postId}에 해당하는 게시글을 찾을 수 없거나 게시되지 않았습니다.`,
      );
    }

    // 대댓글인 경우 부모 댓글 확인
    if (commentInfo.parent) {
      const parentComment = await this.commentRepository
        .findOneOrFail({
          loadRelationIds: true,
          where: { id: commentInfo.parent },
        })
        .catch(() => {
          throw new NotFoundException(
            `ID ${commentInfo.parent}에 해당하는 부모 댓글을 찾을 수 없습니다.`,
          );
        });

      // 부모 댓글의 게시글 ID가 현재 게시글과 일치하는지 확인
      if (parentComment.post_id !== commentInfo.postId) {
        throw new NotFoundException('COMMENT_PARENT_VALIDATION_ERROR');
      }
    }
    // CommentDto를 일반 객체로 변환
    commentInfo = plainToInstance(CreateCommentsDto, commentInfo);
    // 객체 유효성 검사
    await validateOrReject(commentInfo).catch((errors) => {
      throw { status: 500, message: errors[0].constraints };
    });
    // 댓글 생성
    const createdComment =
      await this.commentRepository.createComment(commentInfo);
    return createdComment;
  }

  async findCommentsWithReplies(postId: number): Promise<any[]> {
    const commentsList =
      await this.commentRepository.getCommentsAndReplies(postId);
    return commentsList;
  }

  //댓글(대댓글) 업데이트
  async updateComment(
    id: number,
    updateCommentDto: updateCommentsDto,
  ): Promise<postComments> {
    const existingComment = await this.commentRepository.findOne({
      where: { id },
    });
    if (!existingComment) {
      throw new NotFoundException(`Comment not found with the id ${id}`);
    }

    existingComment.content = updateCommentDto.content;
    await this.commentRepository.save(existingComment);
    return existingComment;
  }

  //댓글(대댓글) soft delete
  async softDeleteComment(id: number): Promise<void> {
    const result = await this.commentRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Comment with id ${id}`);
    }
  }
}
