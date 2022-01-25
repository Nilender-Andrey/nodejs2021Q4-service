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

/* import { Entity, Column, BaseEntity, PrimaryColumn, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import Columns from '../column/column.model';

export interface IColumns {
  id: string;
  order: number;
  title: string;
}

@Entity()
class Board extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({
    length: 100,
  })
  title: string;

  @OneToMany(() => Columns, (columns) => columns.board)
  columns: Columns[] | undefined;

  constructor(title: string, columns?: Columns[]) {
    super();
    this.id = uuidv4();
    this.title = title;
    this.columns = columns;
  }
}

export default Board; */
