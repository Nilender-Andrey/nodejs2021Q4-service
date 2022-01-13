import { FastifyReply, FastifyRequest, RequestGenericInterface } from 'fastify';
import DataBaseError from '../../bd/database_error';
import Columns from '../column/column.model';
import Board from './boards.model';

/**
 * Get all boards from the database and return with a response
 * @param req - request to the server
 * @param res - server response
 */

const getBoards = async (
  req: FastifyRequest,
  res: FastifyReply,
): Promise<void> => {
  try {
    const boards = await Board.find({ relations: ['columns'] });
    res.send(boards).log.debug(`Boards received from the base`);
  } catch (error) {
    throw new DataBaseError(error);
  }
};

interface BoardReqGet extends RequestGenericInterface {
  params: {
    boardId: string;
  };
}

/**
 * Get one board from the database and return with a response
 * @param req - request to the server
 * @param res - server response
 */

const getBoard = async (req: BoardReqGet, res: FastifyReply): Promise<void> => {
  try {
    const { boardId } = req.params;
    const board = await Board.findOne(boardId, { relations: ['columns'] });

    if (board) {
      const result =
        board.columns === null
          ? board
          : {
              ...board,
              columns: board.columns?.map((item) => ({ ...item })),
            };

      res
        .send(result)
        .log.debug(`Boards id: ${boardId} received from the base`);
    } else
      res
        .status(404)
        .send(`Board id:${boardId} is not found`)
        .log.debug(`Board id:${boardId} is not found`);
  } catch (error) {
    throw new DataBaseError(error);
  }
};

interface BoardReqAdd extends RequestGenericInterface {
  body: {
    title: string;
    columns: Columns[];
  };
}

/**
 * Adds board to the database and returns it with a response
 * @param req - request to the server
 * @param res - server response
 */

const addBoard = async (req: BoardReqAdd, res: FastifyReply): Promise<void> => {
  try {
    const { title, columns } = req.body;

    const newBoard = new Board(title);

    const newColumns = columns.map(
      (item) => new Columns(item.order, item.title, newBoard),
    );

    await Board.save(newBoard);
    await Columns.save(newColumns);
    const board = await Board.findOne(newBoard.id, { relations: ['columns'] });

    res.code(201).send(board).log.debug(`New board saved`);
  } catch (error) {
    throw new DataBaseError(error);
  }
};

interface BoardReqPut extends RequestGenericInterface {
  params: {
    boardId: string;
  };
  body: {
    title?: string;
    columns?: Columns[];
  };
}

/**
 * Modifies board to the database and returns it with a response
 * @param req - request to the server
 * @param res - server response
 */

const putBoard = async (req: BoardReqPut, res: FastifyReply): Promise<void> => {
  try {
    const { boardId } = req.params;
    const { title /* columns  */ } = req.body;
    const board = await Board.findOne(boardId, { relations: ['columns'] });

    if (board) {
      board.title = title || board.title;

      await Board.save(board);

      res.send(board);
      // .log.debug(`Board id:${boardId} has been changed`);
    } else {
      res
        .status(404)
        .send(`Board id:${boardId} is not found`)
        .log.debug(`Board id:${boardId} is not found`);
    }
  } catch (error) {
    throw new DataBaseError(error);
  }
};

interface BoardReqDelete extends RequestGenericInterface {
  params: {
    boardId: string;
  };
}

/**
 * Removes the board from the database and all related tasks
 * @param req - request to the server
 * @param res - server response
 */

const deleteBoard = async (
  req: BoardReqDelete,
  res: FastifyReply,
): Promise<void> => {
  try {
    const { boardId } = req.params;
    const board = await Board.findOne(boardId);

    if (board) {
      await Board.remove(board);

      res
        .send({ message: `Board id:${boardId} has been removed` })
        .log.debug(`Board id:${boardId} has been removed`);
    } else {
      res
        .status(404)
        .send(`Board id:${boardId} is not found`)
        .log.warn(`Board id:${boardId} is not found`);
    }
  } catch (error) {
    throw new DataBaseError(error);
  }
};

export { getBoards, getBoard, addBoard, deleteBoard, putBoard };
