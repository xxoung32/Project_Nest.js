import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsRepository } from './posts.repository';
import { posts } from 'src/entities/posts.entity';


@Injectable()
export class PostsService {
    findPosts: any;
    constructor(
        @InjectRepository(PostsRepository)
        private PostRepository: PostsRepository
    ) { }

    async getAllPosts(page: number = 1, pageSize: number =10): Promise<{ result: posts[], count: number, totalPages: number }> {
        return this.PostRepository.findPosts(page, pageSize)
    }

}