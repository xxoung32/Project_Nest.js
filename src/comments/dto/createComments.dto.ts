import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCommentsDto {
  @IsNotEmpty()
  @IsNumber()
  userId?: number;

  @IsNotEmpty()
  @IsNumber()
  postId?: number;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsBoolean()
  @IsOptional()
  is_deleted?: boolean;

  @IsNumber()
  @IsOptional()
  parent?: number;
}
