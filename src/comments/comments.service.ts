import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentsDto } from './dto/createComments.dto';
import { postComments } from 'src/entities/post_comments.entity';
import { CommentRepository } from './comments.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { PostRepository } from 'src/posts/posts.repository';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(CommentRepository)
        private commentRepository: CommentRepository,
        @InjectRepository(PostRepository)
        private postRepository: PostRepository
    ) { }
    async createComment(createCommentDto: CreateCommentsDto): Promise<postComments> {
        const id = createCommentDto.postId
        const parentCommentId = createCommentDto.parentCommentId;
        const existingPost = await this.postRepository.findOne({ where: {id}});
        
        // 게시물이 존재하지 않으면 NotFoundException을 던집니다.
        if (!existingPost) {
            throw new NotFoundException(`ID가 ${id}인 게시물을 찾을 수 없습니다.`);
        }

        //답댓글이 아니라면, orderNumber가 생성될 때마다 번호가 1씩 증가
        if (!parentCommentId) {
            createCommentDto.orderNumber = await this.commentRepository.getNextOrderNumber(id);
        }


        // 존재하는 게시물이면 주어진 댓글 데이터로 새로운 댓글을 생성합니다.
        return await this.commentRepository.createComment(createCommentDto);
    }
}

