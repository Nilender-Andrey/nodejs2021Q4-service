import { v4 as uuidv4 } from 'uuid';
import { BoardArgType } from '../../types/types';
import Column from '../column/column.model';

class Board {
  id: string;

  columns: Column[];

  title: string;

  constructor({ title, columns }: BoardArgType) {
    this.id = uuidv4();
    this.title = title;
    this.columns = columns.map((c) => new Column(c.order, c.title));
  }
}

export default Board;
