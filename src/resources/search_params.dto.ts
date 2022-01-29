import { IsUUID } from 'class-validator';
import Columns from 'src/resources/column/column.model';

export class SearchParams {
  @IsUUID('all')
  id: string;
}
