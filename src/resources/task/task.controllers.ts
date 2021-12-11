import { FastifyReply, RequestGenericInterface } from 'fastify';
import boardsDB from '../../bd/boards';
import tasksDB from '../../bd/tasks';
import Task from './task.model';

interface TasksReqGet extends RequestGenericInterface {
  params: {
    boardId: string;
  };
}

/**
 * Get all tasks from the database and return with a response
 * @param req - request to the server
 * @param res - server response
 */

const getTasks = (req: TasksReqGet, res: FastifyReply): void => {
  const { boardId } = req.params;
  const allTasksInBoard = tasksDB.findAll('boardId', boardId);

  res.send(allTasksInBoard);
};

interface TaskReqGet extends RequestGenericInterface {
  params: {
    boardId: string;
    taskId: string;
  };
}

/**
 * Get one task from the database and return with a response
 * @param req - request to the server
 * @param res - server response
 */

const getTask = (req: TaskReqGet, res: FastifyReply): void => {
  const { boardId, taskId } = req.params;
  const thereIsSuchBoard = boardsDB.findOne('id', boardId);

  if (thereIsSuchBoard) {
    const allTasksInBoard = tasksDB.findAll('boardId', boardId);
    const task = allTasksInBoard.find((t) => t.id === taskId);

    if (task) {
      res.send(task);
    } else {
      res.status(404).send(`Task ${taskId} not found in the board ${boardId}`);
    }
  } else {
    res.status(404).send(`Board ${boardId} is not found`);
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
    userId: string | null;
    boardId: string;
    columnId: string | null;
  };
}

/**
 * Adds task to the database and returns it with a response
 * @param req - request to the server
 * @param res - server response
 */

const addTask = (req: TaskReqAdd, res: FastifyReply): void => {
  const { boardId } = req.params;
  const thereIsSuchBoard = boardsDB.findOne('id', boardId);

  if (thereIsSuchBoard) {
    const { title, order, description, userId, columnId } = req.body;

    const newTask = new Task(
      title,
      order,
      description,
      userId,
      boardId,
      columnId
    );

    tasksDB.add(newTask);
    res.code(201).send(newTask);
  } else {
    res.status(404).send(`Board ${boardId} is not found`);
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

/**
 * Modifies task to the database and returns it with a response
 * @param req - request to the server
 * @param res - server response
 */

const putTask = (req: TaskReqPut, res: FastifyReply): void => {
  const { taskId, boardId } = req.params;
  const thereIsSuchBoard = boardsDB.findOne('id', boardId);

  if (thereIsSuchBoard) {
    const allTasksInBoard = tasksDB.findAll('boardId', boardId);
    const task = allTasksInBoard.find((t) => t.id === taskId);

    if (task) {
      const { title, order, description, userId, columnId } = req.body;
      const newTask = {
        id: task.id,
        title: title || task.title,
        order: order || task.order,
        description: description || task.description,
        userId: userId || task.userId,
        boardId: boardId || task.boardId,
        columnId: columnId || task.columnId,
      };

      tasksDB.change('id', taskId, newTask);

      res.send(newTask);
    } else {
      res.status(404).send(`Task ${taskId} not found in the board ${boardId}`);
    }
  } else {
    res.status(404).send(`Board ${boardId} is not found`);
  }
};

interface TaskReqDelete extends RequestGenericInterface {
  params: {
    boardId: string;
    taskId: string;
  };
}

/**
 * Removes the task from the database
 * @param req - request to the server
 * @param res - server response
 */

const deleteTasks = (req: TaskReqDelete, res: FastifyReply): void => {
  const { taskId, boardId } = req.params;
  const thereIsSuchBoard = boardsDB.findOne('id', boardId);

  if (thereIsSuchBoard) {
    const allTasksInBoard = tasksDB.findAll('boardId', boardId);

    const task = allTasksInBoard.find((t) => t.id === taskId);

    if (task) {
      tasksDB.delete('id', taskId);
      res.send({ message: `task ${taskId} has been removed` });
    } else {
      res.status(404).send(`Task ${taskId} not found in the board ${boardId}`);
    }
  } else {
    res.status(404).send(`Board ${boardId} is not found`);
  }
};

export { getTasks, getTask, addTask, deleteTasks, putTask };
