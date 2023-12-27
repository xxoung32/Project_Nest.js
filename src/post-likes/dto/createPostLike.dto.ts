import { IsInt, IsNotEmpty } from 'class-validator';

export class createPostLikeDto {
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsInt()
  postId: number;
}
