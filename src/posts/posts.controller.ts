//posts.controller.ts
import { BadRequestException, Body, Controller, Get, Param, ParseIntPipe, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
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

    @Get(':id')
    getPostById(@Param('id', ParseIntPipe) id: number) {
        return this.postsService.getPostById(id)
    }


    @Post()
    @UsePipes(ValidationPipe)
    createPost(@Body() createPostDto: CreatePostDto): Promise<posts> {
        return this.postsService.createPost(createPostDto);
    }

}

