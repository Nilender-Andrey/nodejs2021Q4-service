import { v4 as uuidv4 } from 'uuid';
import { Entity } from 'typeorm';
import { ColumnArgType } from '../../types/types';
import Column from '../column/column.model';

/**  The class to create a board instance */
@Entity()
class Board {
  id: string;

  columns: Column[];

  title: string;

  /**
   * to create a board
   * @param columns - array of data to create columns
   * @param title - board name
   * @returns board object
   */

  constructor(title: string, columns: ColumnArgType[]) {
    this.id = uuidv4();
    this.title = title;
    this.columns = columns.map((c) => new Column(c.order, c.title));
  }
}

export default Board;
