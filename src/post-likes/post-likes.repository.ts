import { Injectable } from '@nestjs/common';
import { postLikes } from 'src/entities/post_likes.entity';
import { DataSource, Repository } from 'typeorm';
import { createPostLikeDto } from './dto/createPostLike.dto';

@Injectable()
export class postLikesRepository extends Repository<postLikes> {
  constructor(dataSource: DataSource) {
    super(postLikes, dataSource.createEntityManager());
  }
  async createPostLike(
    createPostLikeDto: createPostLikeDto,
  ): Promise<postLikes> {
    const { userId, postId } = createPostLikeDto;
    const createPostLike = this.create({
      user_id: userId,
      post_id: postId,
    });

    await this.save(createPostLike);
    return createPostLike;
  }
}
