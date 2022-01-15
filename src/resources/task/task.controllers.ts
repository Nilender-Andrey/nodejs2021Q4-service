import { FastifyReply } from 'fastify';
import DataBaseError from '../../bd/database_error';
import Board from '../boards/boards.model';
import User from '../users/user.model';
import Task from './task.model';
import {
  TaskReqAdd,
  TaskReqDelete,
  TaskReqGet,
  TaskReqPut,
  TasksReqGet,
} from './task.types';

/**
 * Gets the user depending on id
 * @param id - id or null
 * @returns user from the database or null
 */

const getUser = async (id: string | null): Promise<User | null> => {
  if (typeof id === 'string') {
    const user = await User.findOne(id);
    return user === undefined ? null : user;
  }
  return null;
};

/**
 * Get all tasks from the database and return with a response
 * @param req - request to the server
 * @param res - server response
 */

const getTasks = async (req: TasksReqGet, res: FastifyReply): Promise<void> => {
  try {
    const { boardId } = req.params;
    const tasks = await Task.find({
      relations: ['user', 'board'],
      where: { boardId },
    });
    res.send(tasks).log.debug(`Tasks received from the base`);
  } catch (error) {
    throw new DataBaseError(error);
  }
};

/**
 * Get one task from the database and return with a response
 * @param req - request to the server
 * @param res - server response
 */

const getTask = async (req: TaskReqGet, res: FastifyReply): Promise<void> => {
  try {
    const { boardId, taskId } = req.params;
    const task = await Task.findOne({
      where: { boardId, id: taskId },
    });

    if (task) {
      res.send(task).log.debug(`Task id: ${taskId} received from the base`);
    } else {
      res
        .status(404)
        .send(`Task ${taskId} not found in the board ${boardId}`)
        .log.debug(`Task ${taskId} not found in the board ${boardId}`);
    }
  } catch (error) {
    throw new DataBaseError(error);
  }
};

/**
 * Add task to the database and returns it with a response
 * @param req - request to the server
 * @param res - server response
 */

const addTask = async (req: TaskReqAdd, res: FastifyReply): Promise<void> => {
  try {
    const { boardId } = req.params;
    const board = await Board.findOne(boardId);

    if (board) {
      const { title, order, description, userId, columnId } = req.body;

      const user = await getUser(userId);

      const newTask = new Task(
        title,
        order,
        description,
        columnId,
        board,
        user,
      );

      await Task.save(newTask);
      res.code(201).send(newTask).log.debug(`New task saved`);
    } else {
      res
        .status(404)
        .send(`Board ${boardId} is not found`)
        .log.debug(`Board id:${boardId} is not found`);
    }
  } catch (error) {
    throw new DataBaseError(error);
  }
};

/**
 * Modifies task to the database and returns it with a response
 * @param req - request to the server
 * @param res - server response
 */

const putTask = async (req: TaskReqPut, res: FastifyReply): Promise<void> => {
  try {
    const { taskId, boardId } = req.params;
    const task = await Task.findOne(taskId);

    if (task) {
      const { title, order, description, userId, columnId } = req.body;

      const user = userId === null ? null : await getUser(userId);

      task.title = title || task.title;
      task.order = order || task.order;
      task.description = description || task.description;
      task.user = user;
      task.columnId = columnId || task.columnId;

      await Task.save(task);

      res.send(task).log.debug(`Task id: ${taskId} has been changed`);
    } else {
      res
        .status(404)
        .send(`Task ${taskId} not found in the board ${boardId}`)
        .log.debug(`Task ${taskId} not found in the board ${boardId}`);
    }
  } catch (error) {
    throw new DataBaseError(error);
  }
};

/**
 * Removes the task from the database and installs null on all his tasks
 * @param req - request to the server
 * @param res - server response
 */

const deleteTasks = async (
  req: TaskReqDelete,
  res: FastifyReply,
): Promise<void> => {
  try {
    const { taskId, boardId } = req.params;
    const task = await Task.findOne(taskId);

    if (task) {
      await Task.remove(task);
      res
        .send({ message: `task ${taskId} has been removed` })
        .log.debug(`Task ${taskId} has been removed`);
    } else {
      res
        .status(404)
        .send(`Task ${taskId} not found in the board ${boardId}`)
        .log.debug(`Task ${taskId} not found in the board ${boardId}`);
    }
  } catch (error) {
    throw new DataBaseError(error);
  }
};

export { getTasks, getTask, addTask, deleteTasks, putTask };
