import { v4 as uuidv4 } from 'uuid';
import { IColumn, ITask } from '../../types/types';

class Task {
  id: string;

  title: string;

  order: number;

  description: string;

  userId: string | null;

  boardId: string;

  columnId: IColumn | null;

  constructor({
    id = uuidv4(),
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  }: ITask) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

export default Task;
