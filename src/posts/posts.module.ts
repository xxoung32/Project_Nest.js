import { Module, Post } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postImages } from 'src/entities/post_images.entity';
import { posts } from 'src/entities/posts.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostsRepository } from './posts.repository';

@Module({

    imports:[
        TypeOrmModule.forFeature([posts]),
        TypeOrmModule.forFeature([postImages])
    ],
    
    controllers: [PostsController],
    providers: [
      PostsService,
      PostsRepository,
    ]

})
export class PostsModule {}
