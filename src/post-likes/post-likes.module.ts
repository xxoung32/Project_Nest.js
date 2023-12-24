import { Module } from '@nestjs/common';
import { PostLikesController } from './post-likes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostLikesService } from './post-likes.service';
import { postLikes } from 'src/entities/post_likes.entity';
import { posts } from 'src/entities/posts.entity';
import { postLikesRepository } from './post-likes.repository';
import { PostRepository } from 'src/posts/posts.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature([postLikes]),
    TypeOrmModule.forFeature([posts])
  ],
  controllers: [PostLikesController],
  providers: [PostLikesService, postLikesRepository, PostRepository]
})
export class PostLikesModule {}
