import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsInt()
  order: number;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsUUID('all')
  userId: string | null;

  @IsOptional()
  @IsUUID('all')
  boardId: string;

  @IsOptional()
  @IsUUID('all')
  columnId: string | null;
}
