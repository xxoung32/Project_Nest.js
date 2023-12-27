import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postComments } from 'src/entities/post_comments.entity';
import { CommentRepository } from './comments.repository';
import { posts } from 'src/entities/posts.entity';
import { PostRepository } from 'src/posts/posts.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([postComments]),
    TypeOrmModule.forFeature([posts]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService, CommentRepository, PostRepository],
})
export class CommentsModule {}
