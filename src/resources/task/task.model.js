const { v4: uuidv4 } = require('uuid');

class Task {
  constructor({
    id = uuidv4(),
    title = 'titleTask',
    order = 'order',
    description = 'descriptionTask',
    userId = 'userId',
    boardId = 'boardId',
    columnId = 'columnId',
  } = {}) {
    this.id = id;
    this.titleTask = title;
    this.order = order;
    this.descriptionTask = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}
/* static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
} */

module.exports = Task;
