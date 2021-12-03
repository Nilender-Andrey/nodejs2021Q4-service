let tasks = require('../../bd/tasks');
const boards = require('../../bd/boards');
const Task = require('./task.model');

const getTasks = (req, res) => {
  const { boardId } = req.params;
  const allTasksInBoard = tasks.filter((t) => t.boardId === boardId);

  res.send(allTasksInBoard);
};

const getTask = (req, res) => {
  const { taskId, boardId } = req.params;
  const thereIsSuchBoard = boards.find((b) => b.id === boardId);

  if (thereIsSuchBoard) {
    const allTasksInBoard = tasks.filter((t) => t.boardId === boardId);
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

const addTask = (req, res) => {
  const { boardId } = req.params;
  const thereIsSuchBoard = boards.find((b) => b.id === boardId);

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
    tasks.push(newTask);
    res.code(201).send(newTask);
  } else {
    res.status(404).send(`Board ${boardId} is not found`);
  }
};

const putTask = (req, res) => {
  const { taskId, boardId } = req.params;
  const thereIsSuchBoard = boards.find((b) => b.id === boardId);

  if (thereIsSuchBoard) {
    const task = tasks.find((t) => t.id === taskId);

    if (task) {
      const { title, order, description, userId, columnId } = req.body;

      const newTask = {
        id: task.id,
        titleTask: title || task.titleTask,
        order: order || task.order,
        descriptionTask: description || task.descriptionTask,
        userId: userId || task.userId,
        boardId: boardId || task.boardId,
        columnId: columnId || task.columnId,
      };

      tasks = tasks.map((t) => (t.id === taskId ? newTask : t));

      res.send(newTask);
    } else {
      res.status(404).send(`Task ${taskId} not found in the board ${boardId}`);
    }
  } else {
    res.status(404).send(`Board ${boardId} is not found`);
  }
};

const deleteTasks = (req, res) => {
  const { taskId, boardId } = req.params;
  const thereIsSuchBoard = boards.find((b) => b.id === boardId);

  if (thereIsSuchBoard) {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      tasks = tasks.filter((t) => t.id !== taskId);
      res.send({ message: `task ${taskId} has been removed` });
    } else {
      res.status(404).send(`Task ${taskId} not found in the board ${boardId}`);
    }
  } else {
    res.status(404).send(`Board ${boardId} is not found`);
  }
};

module.exports = { getTasks, getTask, addTask, deleteTasks, putTask };
