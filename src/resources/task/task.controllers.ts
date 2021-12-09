import { FastifyReply, RequestGenericInterface } from 'fastify';
import boardsDB from '../../bd/boards';
import tasksDB from '../../bd/tasks';
import { IColumn } from '../../types/types';
import Task from './task.model';

interface TasksReqGet extends RequestGenericInterface {
  params: {
    boardId: string;
  };
}

const getTasks = (req: TasksReqGet, res: FastifyReply) => {
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

const getTask = (req: TaskReqGet, res: FastifyReply) => {
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
    columnId: IColumn | null;
  };
}

const addTask = (req: TaskReqAdd, res: FastifyReply) => {
  const { boardId } = req.params;
  const thereIsSuchBoard = boardsDB.findOne('id', boardId);

  if (thereIsSuchBoard) {
    const { title, order, description, userId, columnId } = req.body;
    const data = {
      title,
      order,
      description,
      userId,
      boardId,
      columnId,
    };
    const newTask = new Task(data);

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
    columnId: IColumn | null;
  };
}

const putTask = (req: TaskReqPut, res: FastifyReply) => {
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

const deleteTasks = (req: TaskReqDelete, res: FastifyReply) => {
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
