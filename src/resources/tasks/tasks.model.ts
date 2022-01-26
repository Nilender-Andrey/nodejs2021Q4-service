import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  BaseEntity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Board from '../boards/boards.model';
import User from '../users/users.model';

export interface IBoard {
  id: string;
  title: string;
}

@Entity()
class Task extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  order: number;

  @Column('text')
  description: string;

  @Column({ nullable: true })
  userId: string | null;

  @Exclude()
  @ManyToOne(() => User, (task) => task.id, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'userId' })
  user: User | null;

  @Column()
  boardId: string;

  @Exclude()
  @ManyToOne(() => Board, (board) => board.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'boardId' })
  board: Board;

  @Column({
    type: 'text',
    nullable: true,
  })
  columnId: string | null;
}

export default Task;
