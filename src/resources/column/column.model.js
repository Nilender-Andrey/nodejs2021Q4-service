const { v4: uuidv4 } = require('uuid');

class Column {
  constructor(order, title) {
    this.id = uuidv4();
    this.order = order;
    this.title = title;
  }
}

module.exports = Column;
