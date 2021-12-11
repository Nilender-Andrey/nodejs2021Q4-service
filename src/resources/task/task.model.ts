import { v4 as uuidv4 } from 'uuid';

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
   * @param title - task name
   * @param order - importance of the task
   * @param description - task description
   * @param userId - responsible person identifier
   * @param boardId - ID of the board to which the task is attached
   * @param columnId - column identifier
   * @returns task
   */

  constructor(
    title: string,
    order: number,
    description: string,
    userId: string | null,
    boardId: string,
    columnId: string | null
  ) {
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
