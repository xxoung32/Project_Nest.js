//posts.repository.ts
import { BadRequestException, Injectable } from "@nestjs/common";
import { posts } from "src/entities/posts.entity";
import { DataSource, Repository } from "typeorm";
import { CreatePostDto } from "./dto/createPosts.dto";

@Injectable()
export class PostRepository extends Repository<posts> {
    constructor(dataSource: DataSource){
        super(posts, dataSource.createEntityManager());
    }

    async getAllPosts(page: number = 1, pageSize: number = 10): Promise<any> {
        const skip = (page - 1) * pageSize;
        const [posts, count] = await this.createQueryBuilder('posts') 
            .orderBy('posts.created_at', 'DESC')
            .take(pageSize)
            .skip(skip)
            .getManyAndCount();
   
        const result = posts.map(post => ({
            postId: post.id,
            userId: post.user_id,
            title: post.title,
            content: post.content,
            created_at: post.created_at.toLocaleDateString(),
        }));

        return { result, count, totalPages: Math.ceil(count / pageSize) };
    }

    async getPostById(id: number): Promise<any>{
        const post = await this.createQueryBuilder('posts')
          .select([
            'posts.id', 'posts.user_id', 'posts.title', 'posts.content', 'posts.created_at'
        ])
          .where('posts.id = :id', { id })
          .getOne();

        const postById = {
            postId: post.id,
            userId: post.user_id,
            title: post.title,
            content: post.content,
            created_at: post.created_at?.toLocaleDateString(),
        } 
         
          return postById;
        
    }
    
    async createPosts(createPostDto: CreatePostDto): Promise<posts> {
        const { userId, title, content } = createPostDto;
        const createPost = this.create({
            user_id: userId,
            title,
            content
        })

        await this.save(createPost)
        return createPost;
    }
}