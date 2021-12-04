const { tasksDB } = require('../../bd/tasks');
const { boardsDB } = require('../../bd/boards');
const Task = require('./task.model');

const getTasks = (req, res) => {
  const { boardId } = req.params;
  const allTasksInBoard = tasksDB.findAll('boardId', boardId);

  res.send(allTasksInBoard);
};

const getTask = (req, res) => {
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

const addTask = (req, res) => {
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

const putTask = (req, res) => {
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

const deleteTasks = (req, res) => {
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

module.exports = { getTasks, getTask, addTask, deleteTasks, putTask };
