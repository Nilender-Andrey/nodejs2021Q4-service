let users = require('../../bd/users');
let tasks = require('../../bd/tasks');
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
  users = [...users, newUser];
  // users.push(newUser);
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
  const idUser = req.params.userId;
  const indexUser = users.findIndex((u) => u.id === idUser);

  // todo-------------------------------------------
  console.log(indexUser);
  if (indexUser !== -1) {
    users.splice(indexUser, 1);

    tasks = tasks.map((t) =>
      t.userId === idUser ? { ...t, userId: null } : t
    );

    /* const newTasks = tasks.map((t) => {
      if (t.userId === idUser) {
        // const newT = { ...t, userId: null };
        return { ...t, userId: null };
      }
      return t;
    }); */

    // tasks = [...newTasks];

    // todo-------------------------------------------

    res.send({ message: `User ${idUser} has been removed` });
  } else {
    res.status(404).send(`User ${idUser} is not found`);
  }
  console.log(tasks);
};

module.exports = { getUsers, getUser, addUser, deleteUsers, putUser };
