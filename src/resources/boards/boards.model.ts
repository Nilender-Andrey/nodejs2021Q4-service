import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Columns from '../column/column.model';

export interface IColumns {
  id: string;
  order: number;
  title: string;
}

@Entity()
class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToMany(() => Columns, (columns) => columns.board)
  columns: Columns[] | null;
}

export default Board;
