import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';

@Controller('/boards/:boardId/tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
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

  @Post()
  createTask(
    @Param('boardId') boardId: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.createTask(boardId, createTaskDto);
  }

  @Put(':taskId')
  changeTask(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
  ) {
    return this.tasksService.changeTask(boardId, taskId);
  }

  @Delete(':taskId')
  deleteTask(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
  ) {
    return this.tasksService.deleteTask(boardId, taskId);
  }
}
