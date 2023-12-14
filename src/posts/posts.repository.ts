import { Injectable } from "@nestjs/common";
import { postImages } from "src/entities/post_images.entity";
import { posts } from "src/entities/posts.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class PostsRepository extends Repository<posts> {
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
            Post_images_post_id: post.post_images ? post.post_images.post_id : null, // 실제 값이 있으면 값을 반환 없으면 null 반환
            Posts_images_url: post.post_images ? post.post_images.url : null,
        }));
        return { result, count, totalPages: Math.ceil(count / pageSize) };
    }
}
    

@Injectable()
export class PostImagesRepository extends Repository<postImages> {
    constructor(dataSource: DataSource) {
        super(postImages ,dataSource.createEntityManager());
    }
}
