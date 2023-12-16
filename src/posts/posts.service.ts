//post.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostRepository } from './posts.repository';
import { posts } from 'src/entities/posts.entity';
import { CreatePostDto } from './dto/createPosts.dto';



@Injectable()
export class PostsService {
    findPosts: any;
    constructor(
        @InjectRepository(PostRepository)
        private PostRepository: PostRepository
    ) { }

    async getAllPosts(page: number = 1, pageSize: number =10): Promise<{ result: posts[], count: number, totalPages: number }> {
        return this.PostRepository.getAllPosts(page, pageSize)
    }

    async getPostById(id: number): Promise<posts> {
        const postById = await this.PostRepository.getPostById(id);
        if(!postById){
            throw new NotFoundException(`post not found with the id ${id}`);    
        } return postById;
    }

    async createPost(createPostDto: CreatePostDto): Promise<posts> {
        return this.PostRepository.createPosts(createPostDto);
    }


}