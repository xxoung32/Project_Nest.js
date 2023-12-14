import { Body, Controller, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { posts } from 'src/entities/posts.entity';
import { CreatePostDto } from './dto/createPosts.dto';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) { }

    @Get()
    getAllPost(@Query('page')page: number = 1, @Query('pageSize') pageSize: number = 10): Promise<{ result: posts[], count: number, totalPages: number }> {
        return this.postsService.getAllPosts(page, pageSize);
    }

    //@Get(':/id') 작성

    @Post()
    @UsePipes(ValidationPipe)
    createPost(@Body() CreatePostDto: CreatePostDto): Promise<posts> {
        return this.postsService.createPost(CreatePostDto)
    }


}

