import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsInt()
  order: number;

  @IsString()
  description: string;

  @IsOptional()
  @IsUUID('all')
  userId: string | null;

  @IsOptional()
  boardId: string;

  @IsOptional()
  @IsUUID('all')
  columnId: string | null;
}
