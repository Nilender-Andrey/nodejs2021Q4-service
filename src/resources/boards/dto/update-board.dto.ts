import Columns from 'src/resources/column/column.model';

export class UpdateBoardDto {
  title?: string;
  columns?: Columns[];
}
