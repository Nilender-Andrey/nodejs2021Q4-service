import { v4 as uuidv4 } from 'uuid';
import { IColumn, TaskArgType } from '../../types/types';

class Task {
  title: string;

  order: number;

  description: string;

  userId: string | null;

  boardId: string;

  columnId: IColumn | null;

  id: string;

  constructor({
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  }: TaskArgType) {
    this.id = uuidv4();
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

export default Task;
