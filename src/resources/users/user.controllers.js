let users = require('../../bd/users');
const User = require('./user.model');

const getUsers = (req, res) => {
  res.send(users);
};

const getUser = (req, res) => {
  const { userId } = req.params;
  const user = users.find((u) => u.id === userId);
  res.send(user);
};

const addUser = (req, res) => {
  const newUser = new User(req.body);
  users.push(newUser);
  res.code(201).send(newUser);
};

const putUser = (req, res) => {
  const { userId } = req.params;

  const { name, login, password } = req.body;

  const user = users.find((u) => u.id === userId);

  const newUser = {
    id: user.id,
    name: name || user.name,
    login: login || user.login,
    password: password || user.password,
  };

  users = users.map((u) => (u.id === userId ? newUser : u));

  res.send(newUser);
};

const deleteUsers = (req, res) => {
  const { userId } = req.params;

  users = users.filter((user) => user.id !== userId);

  res.send({ message: `User ${userId} has been removed` });
};

module.exports = { getUsers, getUser, addUser, deleteUsers, putUser };
