import { FastifyReply, FastifyRequest, RequestGenericInterface } from 'fastify';

import tasksDB from '../../bd/tasks';
import usersDB from '../../bd/users';
import User from './user.model';

const getUsers = (req: FastifyRequest, res: FastifyReply) => {
  res.send(usersDB.getBd());
};

interface UserReqGet extends RequestGenericInterface {
  params: {
    userId: string;
  };
}

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

const addUser = (req: UserReqAdd, res: FastifyReply) => {
  const newUser = new User(req.body);
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
