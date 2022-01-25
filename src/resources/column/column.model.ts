import { v4 as uuidv4 } from 'uuid';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

export interface IBoard {
  id: string;
  title: string;
}

@Entity()
class Columns {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  order: number;

  @Column()
  title: string;

  @ManyToOne('Board', 'board', { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'board_id', referencedColumnName: 'id' })
  board: IBoard;
}

export default Columns;
