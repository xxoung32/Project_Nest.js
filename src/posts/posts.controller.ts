//posts.controller.ts
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { posts } from 'src/entities/posts.entity';
import { createPostDto } from './dto/createPosts.dto';
import { UpdatePostDto } from './dto/updatePosts.dto';

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
    createPost(@Body() createPostDto: createPostDto): Promise<posts> {
        return this.postsService.createPost(createPostDto);
    }

    @Patch(':id')
    @UsePipes(ValidationPipe)
    updatePost(@Param('id', ParseIntPipe) id: number, @Body() updatePostDto: UpdatePostDto): Promise<posts> {
        return this.postsService.updatePost(id, updatePostDto)
    }
    
    
    @Delete(':id')
    async deletePost(@Param('id', ParseIntPipe) id): Promise<{ message: string }> {
      await this.postsService.deletePost(id);
      // 직접 응답 객체를 반환하고 Express의 Response 메서드 활용
      return { message: 'DELETE_POST_SUCCESS' };
    }
    




}

