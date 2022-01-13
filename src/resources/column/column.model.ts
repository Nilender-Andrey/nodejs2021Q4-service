import { v4 as uuidv4 } from 'uuid';
import {
  Entity,
  Column,
  ManyToOne,
  BaseEntity,
  PrimaryColumn,
  JoinColumn,
} from 'typeorm';

export interface IBoard {
  id: string;
  title: string;
}

@Entity()
class Columns extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  order: number;

  @Column({
    length: 100,
  })
  title: string;

  @ManyToOne('Board', 'board', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'board_id', referencedColumnName: 'id' })
  board: IBoard;

  constructor(order: number, title: string, board: IBoard) {
    super();
    this.id = uuidv4();
    this.order = order;
    this.title = title;
    this.board = board;
  }
}

export default Columns;
