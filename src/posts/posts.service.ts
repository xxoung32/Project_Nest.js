//post.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostRepository } from './posts.repository';
import { posts } from 'src/entities/posts.entity';
import { createPostDto } from './dto/createPosts.dto';
import { UpdatePostDto } from './dto/updatePosts.dto';


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

    async createPost(createPostDto: createPostDto): Promise<posts> {
        return this.PostRepository.createPosts(createPostDto);
    }

    async updatePost(id: number, updatePostDto: UpdatePostDto): Promise<posts> {
        const existingPost = await this.PostRepository.findOne({ where: {id}});
        if(!existingPost){
            throw new NotFoundException(`Post not found with the id ${id}`);
        }
        existingPost.title = updatePostDto.title;
        existingPost.content = updatePostDto.content;
        await this.PostRepository.save(existingPost);
        return existingPost
       
    }

    
    async deletePost(id: number): Promise<void> {
        const result = await this.PostRepository.delete(id);

        if(result.affected === 0) {
            throw new NotFoundException(`Can't find Board with id ${id}`)
        }
    }


}