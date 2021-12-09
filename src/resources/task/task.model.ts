import { v4 as uuidv4 } from 'uuid';
import { IColumn, TaskArgType } from '../../types/types';

/** The class to create a task instance */
class Task {
  id: string;

  title: string;

  order: number;

  description: string;

  userId: string | null;

  boardId: string;

  columnId: string | null;

  /**
   * to create a task, the constructor takes:
   * @param title - task name {string}
   * @param order - importance of the task {number}
   * @param description - task description {string}
   * @param userId - responsible person identifier {string | null}
   * @param boardId - ID of the board to which the task is attached {string}
   * @param columnId - column identifier {string | null}
   * @returns task object
   */

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
