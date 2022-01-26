import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Board from './boards.model';
import Columns from '../column/column.model';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>,
    @InjectRepository(Columns) private columnsRepository: Repository<Columns>,
  ) {}

  async getAllBoards() {
    const boards = await this.boardRepository.find({
      relations: ['columns'],
    });

    return boards;
  }

  async getOneBoard(boardId: string) {
    const board = await this.boardRepository.findOne(boardId, {
      relations: ['columns'],
    });

    if (!board)
      throw new NotFoundException(`Board id: ${boardId} is not found`);

    const result =
      board.columns === null
        ? board
        : {
            ...board,
            columns: board.columns?.map((item) => ({ ...item })),
          };

    return result;
  }

  async createBoard(createBoardDto: CreateBoardDto) {
    const newBoard = new Board();
    newBoard.title = createBoardDto.title;

    await this.boardRepository.save(newBoard);

    const columns = createBoardDto.columns.map((item) => {
      const newColumn = new Columns();
      newColumn.board = newBoard;
      newColumn.order = item.order;
      newColumn.title = item.title;

      return newColumn;
    });

    await this.columnsRepository.save(columns);

    const board = await this.boardRepository.findOne(newBoard.id, {
      relations: ['columns'],
    });

    return board;
  }

  async changeBoard(boardId: string, updateBoardDto: UpdateBoardDto) {
    const board = await this.boardRepository.findOne(boardId, {
      relations: ['columns'],
    });

    if (!board)
      throw new NotFoundException(`Board id: ${boardId} is not found`);

    board.title = updateBoardDto.title || board.title;
    await this.boardRepository.save(board);
    return board;
  }

  async deleteBoard(boardId: string) {
    const board = await this.boardRepository.findOne(boardId);

    if (!board)
      throw new NotFoundException(`Board id: ${boardId} is not found`);

    await this.boardRepository.remove(board);

    return { message: `Board id:${boardId} has been removed` };
  }
}
