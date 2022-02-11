import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TypeOrmFilter } from 'src/Exceptions/typeOrm.exception';
import { LoggerGuard } from 'src/logger/logger.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guadr';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@ApiTags('Tasks')
@Controller('/boards/:boardId/tasks')
@UseGuards(JwtAuthGuard)
@UseGuards(LoggerGuard)
@UseFilters(TypeOrmFilter)
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getAllTasks(@Param('boardId') boardId: string) {
    return this.tasksService.getAllTasks(boardId);
  }

  @Get(':taskId')
  getOneTask(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
  ) {
    return this.tasksService.getOneTask(boardId, taskId);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  createTask(
    @Param('boardId') boardId: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.createTask(boardId, createTaskDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':taskId')
  changeTask(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.changeTask(boardId, taskId, updateTaskDto);
  }

  @Delete(':taskId')
  deleteTask(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
  ) {
    return this.tasksService.deleteTask(boardId, taskId);
  }
}
