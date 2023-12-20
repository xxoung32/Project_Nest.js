import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCommentsDto {  // 클래스명은 일반적으로 PascalCase로 작성
    @IsNotEmpty()
    @IsInt()
    userId: number;

    @IsNotEmpty()
    @IsInt()
    postId: number;

    @IsOptional()
    @IsInt()
    parentCommentId?: number;

    @IsNotEmpty()
    @IsString()
    content: string;

    @IsOptional()
    @IsNumber()
    orderNumber?: number
    
    
    // static postId: any;


}