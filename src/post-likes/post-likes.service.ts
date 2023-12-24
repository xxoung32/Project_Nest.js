import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { postLikesRepository } from './post-likes.repository';
import { createPostLikeDto } from './dto/createPostLike.dto';
import { postLikes } from 'src/entities/post_likes.entity';

@Injectable()
export class PostLikesService {
  constructor(
    @InjectRepository(postLikesRepository)
    private postLikesRepository: postLikesRepository,
  ) {}
  async createPostLike(createPostLikeDto: createPostLikeDto): Promise<postLikes> {
    const existingPost = await this.PostRepository.findOne
  }
}
