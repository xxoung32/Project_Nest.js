import { Module, Post } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { posts } from 'src/entities/posts.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostRepository } from './posts.repository';

@Module({
  imports: [TypeOrmModule.forFeature([posts])],

  controllers: [PostsController],
  providers: [PostsService, PostRepository],
})
export class PostsModule {}
