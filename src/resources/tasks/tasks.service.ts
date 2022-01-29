import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Board from '../boards/boards.model';
import { BoardsService } from '../boards/boards.service';
import User from '../users/users.model';
import { UsersService } from '../users/users.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import Task from './tasks.model';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    /*   @InjectRepository(Board) private boardRepository: Repository<Board>,
    @InjectRepository(User) private userRepository: Repository<User>, */
    private usersService: UsersService,
    private boardsService: BoardsService,
  ) {}

  async getAllTasks(boardId: string) {
    const tasks = await this.taskRepository.find({
      relations: ['user', 'board'],
      where: { boardId },
    });

    return tasks;
  }

  async getOneTask(boardId: string, taskId: string) {
    const task = await this.taskRepository.findOne({
      where: { boardId, id: taskId },
    });

    if (!task)
      throw new NotFoundException(
        `At the board with id: ${boardId} task with id: ${taskId} not found`,
      );

    return task;
  }

  async createTask(boardId: string, createTaskDto: CreateTaskDto) {
    const board = await this.boardsService.getOneBoard(boardId);

    if (!board)
      throw new NotFoundException(`Board id: ${boardId} is not found`);

    const newTask = new Task();
    newTask.board = board;
    newTask.title = createTaskDto.title;
    newTask.order = createTaskDto.order;
    newTask.description = createTaskDto.description;
    newTask.columnId = createTaskDto.columnId;
    newTask.user = await this._getUser(createTaskDto.userId);

    const task = await this.taskRepository.save(newTask);

    return task;
  }

  async changeTask(
    boardId: string,
    taskId: string,
    updateTaskDto: UpdateTaskDto,
  ) {
    const task = await this.getOneTask(boardId, taskId);

    const { title, order, description, userId, columnId } = updateTaskDto;

    const user = userId === null ? null : await this._getUser(userId);

    task.title = title || task.title;
    task.order = order || task.order;
    task.description = description || task.description;
    task.columnId = columnId || task.columnId;
    task.user = user;

    await this.taskRepository.save(task);

    return task;
  }

  async deleteTask(boardId: string, taskId: string) {
    const task = await this.getOneTask(boardId, taskId);
    await this.taskRepository.remove(task);

    return { message: `Task ${taskId} has been removed` };
  }

  private async _getUser(id: string | null): Promise<User | null> {
    if (typeof id === 'string') {
      const user = await this.usersService.getOneUser(id);

      if (!user)
        throw new NotFoundException(`User id:${id} received from the base`);

      return user;
    }
    return null;
  }
}
