let tasks = [];

function changeBdTasks(newArr) {
  tasks = newArr;
}

function getBdTasks() {
  return tasks;
}

module.exports = { changeBdTasks, getBdTasks };
