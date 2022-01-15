import { FastifyReply, FastifyRequest } from 'fastify';
import DataBaseError from '../../bd/database_error';
import Columns from '../column/column.model';
import Board from './boards.model';
import {
  BoardReqAdd,
  BoardReqDelete,
  BoardReqGet,
  BoardReqPut,
} from './boards.type';

const notFoundInDb = (res: FastifyReply, boardId: string) =>
  res
    .status(404)
    .send(`Board id: ${boardId} is not found`)
    .log.debug(`Board id: ${boardId} is not found`);

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
    } else notFoundInDb(res, boardId);
  } catch (error) {
    throw new DataBaseError(error);
  }
};

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

      res.send(board).log.debug(`Board id:${boardId} has been changed`);
    } else notFoundInDb(res, boardId);
  } catch (error) {
    throw new DataBaseError(error);
  }
};

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
    } else notFoundInDb(res, boardId);
  } catch (error) {
    throw new DataBaseError(error);
  }
};

export { getBoards, getBoard, addBoard, deleteBoard, putBoard };
