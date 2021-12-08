import { FastifyReply } from 'fastify';

import tasksDB from '../../bd/tasks';
import usersDB from '../../bd/users';
import User from './user.model';

const getUsers = (res: FastifyReply) => {
  res.send(usersDB.getBd());
};

const getUser = (req, res: FastifyReply) => {
  const { userId } = req.params;
  const user = usersDB.findOne('id', userId);

  if (user) {
    res.send(user);
  } else {
    res.status(404).send(`User ${userId} is not found`);
  }
};

const addUser = (req, res: FastifyReply) => {
  const newUser = new User(req.body);
  usersDB.add(newUser);

  res.code(201).send(newUser);
};

const putUser = (req, res: FastifyReply) => {
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

const deleteUsers = (req, res: FastifyReply) => {
  const { userId } = req.params;
  const user = usersDB.findOne('id', userId);

  if (user) {
    usersDB.delete('id', userId);

    tasksDB.getBd().forEach((t) => {
      if (t.id === userId) {
        // !
        tasksDB.change('userId', userId, { ...t, userId: null });
      }
    });

    res.send({ message: `User ${userId} has been removed` });
  } else {
    res.status(404).send(`User ${userId} is not found`);
  }
};

export { getUsers, getUser, addUser, deleteUsers, putUser };
