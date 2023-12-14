import { Controller, Get, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { posts } from 'src/entities/posts.entity';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) { }

    @Get()
    getAllPost(@Query('page')page: number = 1, @Query('pageSize') pageSize: number = 10): Promise<{ result: posts[], count: number, totalPages: number }> {
        return this.postsService.getAllPosts(page, pageSize);
    }
}

