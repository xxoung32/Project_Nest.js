//comments.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentsDto } from './dto/createComments.dto';
import { postComments } from 'src/entities/post_comments.entity';
import { updateCommentsDto } from './dto/updateComments.dto';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}
  @Post(':postId')
  @UsePipes(ValidationPipe)
  async createComment(
    @Body() commentInfo: CreateCommentsDto,
    @Param('postId') postId: number,
  ): Promise<postComments> {
    if (postId !== commentInfo.postId) {
      throw new BadRequestException('postId in URL and Body do not match');
    }
    return this.commentsService.createComment(commentInfo);
  }

  @Get(':postId')
  async getCommentsList(@Param('postId') postId: number) {
    const commentsList =
      await this.commentsService.findCommentsWithReplies(postId);
    return commentsList;
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  updateComment(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommentDto: updateCommentsDto,
  ): Promise<postComments> {
    return this.commentsService.updateComment(id, updateCommentDto);
  }

  @Delete(':id')
  async softDeleteComment(
    @Param('id') id: number,
  ): Promise<{ message: string }> {
    await this.commentsService.softDeleteComment(id);
    return { message: 'SOFT_DELETE_POST_SUCCESS' };
  }
}
