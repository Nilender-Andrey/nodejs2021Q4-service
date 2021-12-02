const { v4: uuidv4 } = require('uuid');
const Column = require('../column/column.model');

class Board {
  constructor({
    id = uuidv4(),
    titleTask = 'test_title',
    columns = [{ title: 'Backlog', order: '1' }],
  } = {}) {
    this.id = id;
    this.titleTask = titleTask;
    this.columns = columns.map((c) => new Column(c.title, c.order));
  }
}

module.exports = Board;
