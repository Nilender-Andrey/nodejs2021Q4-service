import {
  Entity,
  Column,
  BaseEntity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import Board from '../boards/boards.model';
import User from '../users/user.model';

export interface IBoard {
  id: string;
  title: string;
}

/** The class to create a task instance */
@Entity()
class Task extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({
    length: 100,
  })
  title: string;

  @Column()
  order: number;

  @Column('text')
  description: string;

  @Column({ nullable: true })
  userId: string | null;

  @ManyToOne(() => User, (task) => task.id, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'userId' /* , referencedColumnName: 'id' */ })
  user: User | null;

  @Column()
  boardId: string;

  @ManyToOne(() => Board, (board) => board.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'boardId' /* , referencedColumnName: 'id' */ })
  board: Board;

  @Column({
    type: 'text',
    nullable: true,
  })
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
    columnId: string | null,
    board: Board,
    user: User | null,
    boardId = '',
    userId: string | null = null,
  ) {
    super();
    this.id = uuidv4();
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.user = user;
    this.boardId = boardId;
    this.columnId = columnId;
    this.board = board;
  }
}

export default Task;
