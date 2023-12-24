import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { postLikesRepository } from './post-likes.repository';
import { PostRepository } from 'src/posts/posts.repository';
import { createPostLikeDto } from './dto/createPostLike.dto';
import { postLikes } from 'src/entities/post_likes.entity';

@Injectable()
export class PostLikesService {
  constructor(
    @InjectRepository(postLikesRepository)
    private postLikesRepository: postLikesRepository,
    private PostRepository: PostRepository,
  ) {}
  async createPostLike(
    createPostLikeDto: createPostLikeDto,
  ): Promise<postLikes> {
    const existingPost = await this.PostRepository.findOne({
      where: { id: createPostLikeDto.postId },
    });
    if (!existingPost) {
      throw new NotFoundException(
        `ID ${createPostLikeDto.postId}에 해당하는 게시글을 찾을 수 없거나 게시되지 않았습니다.`,
      );
    }
    return this.postLikesRepository.createPostLike(createPostLikeDto);
  }
}
