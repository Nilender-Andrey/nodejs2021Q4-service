import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Board from '../boards/boards.model';
import User from '../users/users.model';
import Task from './tasks.model';

@Module({
  imports: [TypeOrmModule.forFeature([Board, User, Task])],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
