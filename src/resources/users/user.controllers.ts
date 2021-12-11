import { FastifyReply, FastifyRequest, RequestGenericInterface } from 'fastify';

import tasksDB from '../../bd/tasks';
import usersDB from '../../bd/users';
import User from './user.model';

/**
 * Get all users from the database and return with a response
 * @param req - request to the server
 * @param res - server response
 */

const getUsers = (req: FastifyRequest, res: FastifyReply) => {
  res.send(usersDB.getBd());
};

interface UserReqGet extends RequestGenericInterface {
  params: {
    userId: string;
  };
}

/**
 * Get one users from the database and return with a response
 * @param req - request to the server
 * @param res - server response
 */

const getUser = (req: UserReqGet, res: FastifyReply) => {
  const { userId } = req.params;
  const user = usersDB.findOne('id', userId);

  if (user) {
    res.send(user);
  } else {
    res.status(404).send(`User ${userId} is not found`);
  }
};

interface UserReqAdd extends RequestGenericInterface {
  body: {
    name: string;
    login: string;
    password: string;
  };
}

/**
 * Add user to the database and returns it with a response
 * @param req - request to the server
 * @param res - server response
 */

const addUser = (req: UserReqAdd, res: FastifyReply) => {
  const { name, login, password } = req.body;
  const newUser = new User(name, login, password);
  usersDB.add(newUser);

  res.code(201).send(newUser);
};

interface UserReqPut extends RequestGenericInterface {
  params: {
    userId: string;
  };
  body: {
    name?: string;
    login?: string;
    password?: string;
  };
}

/**
 * Modifies user to the database and returns it with a response
 * @param req - request to the server
 * @param res - server response
 */

const putUser = (req: UserReqPut, res: FastifyReply) => {
  const { userId } = req.params;
  const { name, login, password } = req.body;
  const user = usersDB.findOne('id', userId);

  if (user) {
    const newUser = {
      id: user.id,
      name: name || user.name,
      login: login || user.login,
      password: password || user.password,
    };
    usersDB.change('id', userId, newUser);

    res.send(newUser);
  } else {
    res.status(404).send(`User ${userId} is not found`);
  }
};

interface UserReqDelete extends RequestGenericInterface {
  params: {
    userId: string;
  };
}

/**
 * Removes the user from the database and installs null on all his tasks
 * @param req - request to the server
 * @param res - server response
 */

const deleteUsers = (req: UserReqDelete, res: FastifyReply) => {
  const { userId } = req.params;
  const user = usersDB.findOne('id', userId);

  if (user) {
    usersDB.delete('id', userId);

    tasksDB.getBd().forEach((t) => {
      if (t.userId === userId) {
        tasksDB.change('userId', userId, { ...t, userId: null });
      }
    });

    res.send({ message: `User ${userId} has been removed` });
  } else {
    res.status(404).send(`User ${userId} is not found`);
  }
};

export { getUsers, getUser, addUser, deleteUsers, putUser };
