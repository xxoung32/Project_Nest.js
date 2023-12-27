import { IsNotEmpty, IsString } from 'class-validator';

export class updateCommentsDto {
  @IsNotEmpty()
  @IsString()
  content: string;
  deleted_at: boolean;
}
