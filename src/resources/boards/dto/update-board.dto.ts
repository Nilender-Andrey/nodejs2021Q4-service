import { IsArray, IsOptional, IsString } from 'class-validator';
import Columns from 'src/resources/column/column.model';

export class UpdateBoardDto {
  @IsString()
  title?: string;

  @IsOptional()
  @IsArray()
  columns?: Columns[];
}
