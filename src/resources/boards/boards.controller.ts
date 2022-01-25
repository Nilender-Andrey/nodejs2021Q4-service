import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('/boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  getAllBoards() {
    return this.boardsService.getAllBoards();
  }

  @Get(':boardId')
  getOneBoard(@Param('boardId') boardId: string) {
    return this.boardsService.getOneBoard(boardId);
  }

  @Post()
  createBoard(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Put(':boardId')
  changeBoard(
    @Param('boardId') boardId: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    return this.boardsService.changeBoard(boardId, updateBoardDto);
  }

  @Delete(':boardId')
  deleteBoard(@Param('boardId') boardId: string) {
    return this.boardsService.deleteBoard(boardId);
  }
}
