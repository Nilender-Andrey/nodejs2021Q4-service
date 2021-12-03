const { v4: uuidv4 } = require('uuid');
const Column = require('../column/column.model');

class Board {
  constructor(title = 'test_title', columns = [{ title: 'test', order: 1 }]) {
    this.id = uuidv4();
    this.title = title;
    this.columns = columns.map((c) => new Column(c.order, c.title));
  }
}

module.exports = Board;
