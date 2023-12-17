//updatedto.ts
import { PartialType } from "@nestjs/mapped-types";
import { createPostDto } from "./createPosts.dto";
import { IsOptional, IsString } from "class-validator";

export class UpdatePostDto extends PartialType(createPostDto) {
    @IsString()
    @IsOptional() 
    title?: string; // title 속성만 수정 가능하도록 추가
  
    @IsString()
    @IsOptional() 
    content?: string; // content 속성만 수정 가능하도록 추가

};