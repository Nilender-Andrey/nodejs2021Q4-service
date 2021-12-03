let boards = require('../../bd/boards');
// const tasks = require('../../bd/tasks');
const Board = require('./boards.model');

const getBoards = (req, res) => {
  res.send(boards);
};

const getBoard = (req, res) => {
  const { boardId } = req.params;
  const board = boards.find((b) => b.id === boardId);

  if (board) {
    res.send(board);
  } else {
    res.status(404).send(`Board ${boardId} is not found`);
  }
};

const addBoard = (req, res) => {
  const { title, columns } = req.body;
  const newBoard = new Board(title, columns);

  boards.push(newBoard);
  res.code(201).send(newBoard);
};

const putBoard = (req, res) => {
  const { boardId } = req.params;
  const board = boards.find((b) => b.id === boardId);

  if (board) {
    const { title, columns } = req.body;
    const newBoard = {
      id: board.id,
      title: title || board.title,
      columns: columns || board.columns,
    };

    boards = boards.map((b) => (b.id === boardId ? newBoard : b));

    res.send(newBoard);
  } else {
    res.status(404).send(`Board ${boardId} is not found`);
  }
};

const deleteBoard = (req, res) => {
  const { boardId } = req.params;
  const indexBoard = boards.findIndex((b) => b.id === boardId);

  if (indexBoard !== -1) {
    boards.splice(indexBoard, 1);

    // todo----1v
    // tasks = tasks.map((t) =>
    //   t.userId === idUser ? { ...t, userId: null } : t
    // );

    // todo----2v
    // tasks.forEach((t, index, array) => {
    //   if (t.boardId === boardId) {
    //     array.splice(index, 1);
    //   }
    // });

    res.send({ message: `Board ${boardId} has been removed` });
  } else {
    res.status(404).send(`Board ${boardId} is not found`);
  }
};

module.exports = { getBoards, getBoard, addBoard, deleteBoard, putBoard };
