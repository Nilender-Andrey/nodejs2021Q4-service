import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Board from './boards.model';
import Columns from '../column/column.model';

@Module({
  imports: [TypeOrmModule.forFeature([Board, Columns])],
  providers: [BoardsService],
  controllers: [BoardsController],
})
export class BoardsModule {}
