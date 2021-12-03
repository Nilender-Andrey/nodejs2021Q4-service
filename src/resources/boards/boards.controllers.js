const { changeBdBoards, getBdBoards } = require('../../bd/boards');
const { changeBdTasks, getBdTasks } = require('../../bd/tasks');
const Board = require('./boards.model');

const getBoards = (req, res) => {
  res.send(getBdBoards());
};

const getBoard = (req, res) => {
  const { boardId } = req.params;
  const board = getBdBoards().find((b) => b.id === boardId);

  if (board) {
    res.send(board);
  } else {
    res.status(404).send(`Board ${boardId} is not found`);
  }
};

const addBoard = (req, res) => {
  const { title, columns } = req.body;
  const newBoard = new Board(title, columns);

  changeBdBoards([...getBdBoards(), newBoard]);
  res.code(201).send(newBoard);
};

const putBoard = (req, res) => {
  const { boardId } = req.params;
  const board = getBdBoards().find((b) => b.id === boardId);

  if (board) {
    const { title, columns } = req.body;
    const newBoard = {
      id: board.id,
      title: title || board.title,
      columns: columns || board.columns,
    };

    changeBdBoards([
      ...getBdBoards().map((b) => (b.id === boardId ? newBoard : b)),
    ]);

    res.send(newBoard);
  } else {
    res.status(404).send(`Board ${boardId} is not found`);
  }
};

const deleteBoard = (req, res) => {
  const { boardId } = req.params;
  const indexBoard = getBdBoards().findIndex((b) => b.id === boardId);

  if (indexBoard !== -1) {
    changeBdBoards(getBdBoards().filter((b) => b.id !== boardId));
    changeBdTasks(getBdTasks().filter((t) => t.boardId !== boardId));

    res.send({ message: `Board ${boardId} has been removed` });
  } else {
    res.status(404).send(`Board ${boardId} is not found`);
  }
};

module.exports = { getBoards, getBoard, addBoard, deleteBoard, putBoard };
