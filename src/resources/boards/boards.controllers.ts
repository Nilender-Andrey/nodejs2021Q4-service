import { FastifyReply, FastifyRequest, RequestGenericInterface } from 'fastify';
import boardsDB from '../../bd/boards';
import tasksDB from '../../bd/tasks';
import { IBoard } from '../../types/types';
import Board from './boards.model';

const getBoards = (req: FastifyRequest, res: FastifyReply) => {
  res.send(boardsDB.getBd());
};

interface BoardReqGet extends FastifyRequest {
  params: {
    boardId: string;
  };
}

const getBoard = (req: BoardReqGet, res: FastifyReply) => {
  const { boardId } = req.params;
  if (boardId) {
    const board = boardsDB.findOne('id', boardId);

    if (board) {
      res.send(board);
    } else {
      res.status(404).send(`Board ${boardId} is not found`);
    }
  }
};

interface BoardReqAdd extends RequestGenericInterface {
  body: {
    title: string;
    columns: { order: number; title: string }[];
  };
}

const addBoard = (req: BoardReqAdd, res: FastifyReply) => {
  const { title, columns } = req.body;
  const newBoard = new Board(title, columns);

  boardsDB.add(newBoard);
  res.code(201).send(newBoard);
};

interface BoardReqPut extends RequestGenericInterface {
  params: {
    boardId: string;
  };
  body: {
    title: string;
    // columns: { order: number; title: string }[];
  };
}

const putBoard = (req: BoardReqPut, res: FastifyReply) => {
  const { boardId } = req.params;
  const board = boardsDB.findOne('id', boardId);

  if (board) {
    const { title } = req.body;
    const newBoard: IBoard = {
      id: board.id,
      title: title || board.title,
      // columns: columns || board.columns,
    };

    boardsDB.change('id', boardId, newBoard);

    res.send(newBoard);
  } else {
    res.status(404).send(`Board ${boardId} is not found`);
  }
};

interface BoardReqDelete extends RequestGenericInterface {
  params: {
    boardId: string;
  };
}

const deleteBoard = (req: BoardReqDelete, res: FastifyReply) => {
  const { boardId } = req.params;
  const board = boardsDB.findOne('id', boardId);

  if (board) {
    boardsDB.delete('id', boardId);
    tasksDB.delete('id', boardId); //!

    res.send({ message: `Board ${boardId} has been removed` });
  } else {
    res.status(404).send(`Board ${boardId} is not found`);
  }
};

export { getBoards, getBoard, addBoard, deleteBoard, putBoard };
