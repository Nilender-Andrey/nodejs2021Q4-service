import { v4 as uuidv4 } from 'uuid';
import { BoardArgType } from '../../types/types';
import Column from '../column/column.model';

/**  The class to create a board instance */

class Board {
  id: string;

  columns: Column[];

  title: string;

  /**
   * to create a board, the constructor takes:
   * @param columns - array of data to create columns {string}
   * @param title - board name {string}
   * @returns board object {object}
   */

  constructor({ title, columns }: BoardArgType) {
    this.id = uuidv4();
    this.title = title;
    this.columns = columns.map((c) => new Column(c.order, c.title));
  }
}

export default Board;
