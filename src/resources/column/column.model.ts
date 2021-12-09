import { v4 as uuidv4 } from 'uuid';

class Column {
  order: number;

  title: string;

  id: string;

  constructor(order: number, title: string) {
    this.id = uuidv4();
    this.order = order;
    this.title = title;
  }
}

export default Column;
