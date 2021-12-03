const { changeBdUsers, getBdUsers } = require('../../bd/users');
const { changeBdTasks, getBdTasks } = require('../../bd/tasks');
const User = require('./user.model');

const getUsers = (req, res) => {
  res.send(getBdUsers());
};

const getUser = (req, res) => {
  const { userId } = req.params;
  const user = getBdUsers().find((u) => u.id === userId);

  res.send(user);
};

const addUser = (req, res) => {
  const newUser = new User(req.body);

  changeBdUsers([...getBdUsers(), newUser]);
  res.code(201).send(newUser);
};

const putUser = (req, res) => {
  const { userId } = req.params;
  const { name, login, password } = req.body;
  const user = getBdUsers().find((u) => u.id === userId);
  const newUser = {
    id: user.id,
    name: name || user.name,
    login: login || user.login,
    password: password || user.password,
  };

  changeBdUsers(getBdUsers().map((u) => (u.id === userId ? newUser : u)));
  res.send(newUser);
};

const deleteUsers = async (req, res) => {
  const { userId } = req.params;
  const indexUser = getBdUsers().findIndex((u) => u.id === userId);

  if (indexUser !== -1) {
    changeBdUsers(getBdUsers().filter((u) => u.id !== userId));
    changeBdTasks(
      getBdTasks().map((t) =>
        t.userId === userId ? { ...t, userId: null } : t
      )
    );

    await res.send({ message: `User ${userId} has been removed` });
  } else {
    await res.status(404).send(`User ${userId} is not found`);
  }
};

module.exports = { getUsers, getUser, addUser, deleteUsers, putUser };
