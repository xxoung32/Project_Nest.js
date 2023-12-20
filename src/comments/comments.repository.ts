import { Injectable } from "@nestjs/common";
import { postComments } from "src/entities/post_comments.entity";
import { DataSource, Repository } from "typeorm";
import { CreateCommentsDto } from "./dto/createComments.dto";
import { posts } from "src/entities/posts.entity";

@Injectable()
export class CommentRepository extends Repository<postComments>{
    constructor(dataSource: DataSource){
        super(postComments, dataSource.createEntityManager());
    }

    async createComment(createCommentDto: CreateCommentsDto): Promise<postComments> {
        const { userId, postId, content, parentCommentId } = createCommentDto
        const createComment = this.create({
            user_id: userId,
            post_id: postId,
            content,
            parentComment: parentCommentId ? { id: parentCommentId } : null, // 부모 댓글이 있는 경우 설정
            orderNumber: parentCommentId ? null : await this.getNextOrderNumber(postId), // 부모 댓글이 없는 경우 orderNumber 설정
        })
        await this.save(createComment)
        return createComment;

    }  

    async getNextOrderNumber(postId: number): Promise<number> {
        const result = await this.createQueryBuilder('comment')
            .select('MAX(comment.orderNumber)', 'maxOrderNumber')
            .where('comment.post_id = :postId', { postId })
            .getRawOne();

            const maxOrderNumber = result.maxOrderNumber || 0;
            return maxOrderNumber + 1;
    }


}
