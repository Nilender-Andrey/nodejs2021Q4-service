const { boardsDB } = require('../../bd/boards');
const { tasksDB } = require('../../bd/tasks');
const Board = require('./boards.model');

const getBoards = (req, res) => {
  res.send(boardsDB.getBd());
};

const getBoard = (req, res) => {
  const { boardId } = req.params;
  const board = boardsDB.findOne('id', boardId);

  if (board) {
    res.send(board);
  } else {
    res.status(404).send(`Board ${boardId} is not found`);
  }
};

const addBoard = (req, res) => {
  const { title, columns } = req.body;
  const newBoard = new Board(title, columns);

  boardsDB.add(newBoard);
  res.code(201).send(newBoard);
};

const putBoard = (req, res) => {
  const { boardId } = req.params;
  const board = boardsDB.findOne('id', boardId);

  if (board) {
    const { title, columns } = req.body;
    const newBoard = {
      id: board.id,
      title: title || board.title,
      columns: columns || board.columns,
    };

    boardsDB.change('id', boardId, newBoard);

    res.send(newBoard);
  } else {
    res.status(404).send(`Board ${boardId} is not found`);
  }
};

const deleteBoard = (req, res) => {
  const { boardId } = req.params;
  const board = boardsDB.findOne('id', boardId);

  if (board) {
    boardsDB.delete('id', boardId);
    tasksDB.delete('boardId', boardId);

    res.send({ message: `Board ${boardId} has been removed` });
  } else {
    res.status(404).send(`Board ${boardId} is not found`);
  }
};

module.exports = { getBoards, getBoard, addBoard, deleteBoard, putBoard };
