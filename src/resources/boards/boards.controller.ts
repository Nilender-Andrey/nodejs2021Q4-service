import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TypeOrmFilter } from 'src/Exceptions/typeOrm.exception';
import { LoggerGuard } from 'src/logger/logger.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guadr';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@ApiTags('Boards')
@Controller('/boards')
@UseGuards(JwtAuthGuard)
@UseGuards(LoggerGuard)
@UseFilters(TypeOrmFilter)
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
