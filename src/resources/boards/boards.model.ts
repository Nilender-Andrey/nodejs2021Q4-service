import { v4 as uuidv4 } from 'uuid';
import Column from '../column/column.model';

class Board {
  id: string;

  columns: Column[];

  title: string;

  constructor(title: string, columns: { order: number; title: string }[]) {
    this.id = uuidv4();
    this.title = title;
    this.columns = columns.map((c) => new Column(c.order, c.title));
  }
}

export default Board;
