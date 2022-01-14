import { FastifyReply, RequestGenericInterface } from 'fastify';
import DataBaseError from '../../bd/database_error';
import Board from '../boards/boards.model';
import User from '../users/user.model';
// import User from '../users/user.model';
import Task from './task.model';

const getUser = async (id: string | null) => {
  if (typeof id === 'string') {
    const user = await User.findOne(id);
    return user === undefined ? null : user;
  }
  return null;
};
interface TasksReqGet extends RequestGenericInterface {
  params: {
    boardId: string;
  };
}

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

interface TaskReqGet extends RequestGenericInterface {
  params: {
    boardId: string;
    taskId: string;
  };
}

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

interface TaskReqAdd extends RequestGenericInterface {
  params: {
    boardId: string;
    taskId: string;
  };
  body: {
    title: string;
    order: number;
    description: string;
    columnId: string | null;
    userId: string | null;
    boardId: string;
  };
}

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
        // board.id,
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

interface TaskReqPut extends RequestGenericInterface {
  params: {
    boardId: string;
    taskId: string;
  };
  body: {
    title: string;
    order: number;
    description: string;
    userId: string | null;
    boardId: string;
    columnId: string | null;
  };
}

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

interface TaskReqDelete extends RequestGenericInterface {
  params: {
    boardId: string;
    taskId: string;
  };
}

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
