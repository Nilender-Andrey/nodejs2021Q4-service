import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  async getAllTasks(boardID: string) {
    return 'all';
  }

  async getOneTask(boardID: string, taskId: string) {
    return taskId;
  }

  async createTask(boardID: string, createTaskDto: CreateTaskDto) {
    return [boardID, createTaskDto];
  }

  async changeTask(boardID: string, taskId: string) {
    return taskId;
  }
  async deleteTask(boardID: string, taskId: string) {
    return taskId;
  }
}
