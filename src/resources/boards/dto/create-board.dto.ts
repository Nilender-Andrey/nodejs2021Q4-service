import {
  IsArray,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import Columns from 'src/resources/column/column.model';

export class CreateBoardDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsArray()
  columns: Columns[];
}
