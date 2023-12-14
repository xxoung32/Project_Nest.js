import { Injectable } from "@nestjs/common";
import { postImages } from "src/entities/post_images.entity";
import { posts } from "src/entities/posts.entity";
import { DataSource, Repository } from "typeorm";
import { CreatePostDto } from "./dto/createPosts.dto";

@Injectable()
export class PostsRepository extends Repository<posts> {
    postImagesRepository: any;
    constructor(dataSource: DataSource) {
        super(posts, dataSource.createEntityManager());
    }
    async findPosts(page: number =1, pageSize: number = 10): Promise<any> {
        const skip = (page - 1) * pageSize;
        
        //post와 post_images를 join하여 게시물과 이미지 정보 함께 불러오기
        const [posts, count] = await this.createQueryBuilder('posts')
            .leftJoinAndSelect('posts.post_images', 'post_images')   
            .orderBy('posts.created_at', 'DESC')
            .take(pageSize)
            .skip(skip)
            .getManyAndCount()

        // 게시물과 이미지 정보를 가공하여 반환합니다.    
        const result = posts.map(post => ({
            Posts_id: post.id,
            Posts_user_id: post.user_id,
            Posts_title: post.title,
            Posts_content: post.content,
            Posts_created_at: post.created_at.toLocaleDateString(),
            Post_images_post_id: post.post_images.length > 0 ? post.post_images[0].post_id : null,
            Posts_images_url: post.post_images.length > 0 ? post.post_images[0].url : null,
        }));
        return { result, count, totalPages: Math.ceil(count / pageSize) };
    }

    async createPost(createPostDto: CreatePostDto): Promise <posts> {
        const { title, content, userId, postImages} = createPostDto;
        const post = this.create({
            user_id: userId,
            title,
            content
        }) 
        await this.save(post);
        
        // 이미지 정보가 제공된 경우에만 이미지 저장
        if (postImages) {
            for (const image of postImages) {
                const postImage = this.postImagesRepository.create({
                    post_id: post.id,
                    url: image.url,
                });
                await this.postImagesRepository.save(postImage);
            }
        }

        return post;
    }
        
}
    

@Injectable()
export class PostImagesRepository extends Repository<postImages> {
    constructor(dataSource: DataSource) {
        super(postImages ,dataSource.createEntityManager());
    }
}
