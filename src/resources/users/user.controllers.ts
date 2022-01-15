import { FastifyReply, FastifyRequest } from 'fastify';
import DataBaseError from '../../bd/database_error';
import User from './user.model';
import {
  UserReqAdd,
  UserReqDelete,
  UserReqGet,
  UserReqPut,
} from './user.types';

/**
 * Get all users from the database and return with a response
 * @param req - request to the server
 * @param res - server response
 */

const getUsers = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const users = await User.find();
    res.send(users).log.debug(`Users received from the base`);
  } catch (error) {
    throw new DataBaseError(error);
  }
};

/**
 * Get one user from the database and return with a response
 * @param req - request to the server
 * @param res - server response
 */

const getUser = async (req: UserReqGet, res: FastifyReply) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne(userId);

    if (user) {
      res.send(user).log.debug(`User id:${userId} received from the base`);
    } else {
      res.status(404).send(`User id:${userId} is not found`);
    }
  } catch (error) {
    throw new DataBaseError(error);
  }
};

/**
 * Add user to the database and returns it with a response
 * @param req - request to the server
 * @param res - server response
 */

const addUser = async (req: UserReqAdd, res: FastifyReply) => {
  try {
    const { name, login, password } = req.body;
    const newUser = new User(name, login, password);

    await User.save(newUser);

    res.code(201).send(newUser).log.debug(`New user saved`);
  } catch (error) {
    throw new DataBaseError(error);
  }
};

/**
 * Modifies user to the database and returns it with a response
 * @param req - request to the server
 * @param res - server response
 */

const putUser = async (req: UserReqPut, res: FastifyReply) => {
  try {
    const { userId } = req.params;
    const { name, login, password } = req.body;
    const user = await User.findOne(userId);

    if (user) {
      user.name = name || user.name;
      user.login = login || user.login;
      user.password = password || user.password;

      await User.save(user);

      res.send(user).log.debug(`Board id:${userId} has been removed`);
    } else {
      res
        .status(404)
        .send(`User id:${userId} is not found`)
        .log.debug(`User id:${userId} is not found`);
    }
  } catch (error) {
    throw new DataBaseError(error);
  }
};

/**
 * Removes the user from the database and installs null on all his tasks
 * @param req - request to the server
 * @param res - server response
 */

const deleteUsers = async (req: UserReqDelete, res: FastifyReply) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne(userId);

    if (user) {
      await User.remove(user);

      res
        .send({ message: `User id:${userId} has been removed` })
        .log.debug(`User id:${userId} has been removed`);
    } else {
      res.status(404).send(`User ${userId} is not found`);
    }
  } catch (error) {
    throw new DataBaseError(error);
  }
};

export { getUsers, getUser, addUser, deleteUsers, putUser };
