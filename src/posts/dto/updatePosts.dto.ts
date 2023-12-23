//updatedto.ts
import { IsOptional, IsString } from 'class-validator';

export class UpdatePostDto {
  @IsString()
  @IsOptional()
  title?: string; // title 속성만 수정 가능하도록 변경, 기본값은 undefined

  @IsString()
  @IsOptional()
  content?: string; // content 속성만 수정 가능하도록 변경, 기본값은 undefined

  constructor(partial: Partial<UpdatePostDto>) {
    Object.assign(this, partial);
  }
}
