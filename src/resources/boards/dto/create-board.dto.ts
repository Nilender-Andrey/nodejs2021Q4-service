import Columns from 'src/resources/column/column.model';

export class CreateBoardDto {
  title: string;
  columns: Columns[];
}
