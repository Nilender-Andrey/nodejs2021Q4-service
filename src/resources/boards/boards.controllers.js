let boards = require('../../bd/boards');
const Board = require('./boards.model');

const getBoards = (req, res) => {
  res.send(boards);
};

const getBoard = (req, res) => {
  const { boardId } = req.params;
  const board = boards.find((b) => b.id === boardId);
  res.send(board);
};

const addBoard = (req, res) => {
  const newBoard = new Board(req.body);

  console.log(req.body);
  boards.push(newBoard);
  res.code(201).send(newBoard);
};

const putBoard = (req, res) => {
  const { userId } = req.params;
  const { title, columns } = req.body;
  const board = boards.find((u) => u.id === userId);

  const newBoard = {
    id: board.id,
    title: title || board.title,
    columns: columns || board.columns,
  };

  boards = boards.map((u) => (u.id === userId ? newBoard : u));

  res.send(newBoard);
};

const deleteBoard = (req, res) => {
  const { userId } = req.params;

  boards = boards.filter((user) => user.id !== userId);

  res.send({ message: `Board ${userId} has been removed` });
};

module.exports = { getBoards, getBoard, addBoard, deleteBoard, putBoard };
