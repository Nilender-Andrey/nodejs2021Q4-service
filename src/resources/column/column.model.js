const { v4: uuidv4 } = require('uuid');

class Column {
  constructor({ id = uuidv4(), title, order }) {
    this.id = id;
    this.order = order;
    this.title = title;
  }
}

module.exports = Column;
