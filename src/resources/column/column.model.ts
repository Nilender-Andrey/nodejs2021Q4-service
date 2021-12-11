import { v4 as uuidv4 } from 'uuid';

/**  The class to create a сolumn instance */
class Column {
  order: number;

  title: string;

  id: string;

  /**
   * to create a сolumn
   * @param title - сolumn name
   * @param order - importance of the сolumn
   * @returns сolumn
   */

  constructor(order: number, title: string) {
    this.id = uuidv4();
    this.order = order;
    this.title = title;
  }
}

export default Column;
