import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { postComments } from 'src/entities/post_comments.entity';
import { CommentsService } from './comments.service';
import { CreateCommentsDto } from './dto/createComments.dto';

@Controller('comments')
export class CommentsController {
    constructor(private commentsService: CommentsService) { }
@Post()
@UsePipes(ValidationPipe)
createComment(@Body() createCommentDto: CreateCommentsDto): Promise<postComments> {
    return this.commentsService.createComment(createCommentDto);
}
}
