import { IsUUID } from 'class-validator';

export class SearchParams {
  @IsUUID('all')
  id: string;
}
