import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  async getAllBoards() {
    return 'all';
  }

  async getOneBoard(id: string) {
    return id;
  }

  async createBoard(createBoardDto: CreateBoardDto) {
    return createBoardDto;
  }

  async changeBoard(id: string) {
    return id;
  }
  async deleteBoard(id: string) {
    return id;
  }
}
