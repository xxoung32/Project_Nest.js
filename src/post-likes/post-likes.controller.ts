import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Param,
  ParseIntPipe,
  BadRequestException,
  Delete,
} from '@nestjs/common';
import { PostLikesService } from './post-likes.service';
import { postLikes } from 'src/entities/post_likes.entity';
import { createPostLikeDto } from './dto/createPostLike.dto';

@Controller('postLikes')
export class PostLikesController {
  constructor(private postLikesService: PostLikesService) {}

  @Post(':postId')
  @UsePipes(ValidationPipe)
  createPost(
    @Body() createPostLikeDto: createPostLikeDto,
    @Param('postId', ParseIntPipe) postId: number,
  ): Promise<postLikes> {
    if (postId !== createPostLikeDto.postId) {
      throw new BadRequestException('postId in URL and Body do not match');
    }
    return this.postLikesService.createPostLike(createPostLikeDto);
  }

  @Delete(':id')
  async deletePostLike(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    await this.postLikesService.deletePostLike(id);
    return { message: 'DELETE_LIKE_SUCCESS' };
  }
}
