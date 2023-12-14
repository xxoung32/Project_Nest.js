import { IsNotEmpty } from "class-validator";

export class CreatePostDto {
    @IsNotEmpty()
    userId: number;
    
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    content: string;

    postImages: Array<{
        postId: number;
        url: string;
    }>;


}

