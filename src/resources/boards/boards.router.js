const {
  getBoards,
  getBoard,
  addBoard,
  deleteBoard,
  putBoard,
} = require('./boards.controllers');

// Board shema
const boardSсhema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    columns: {
      type: 'array',
      items: {
        id: { type: 'string' },
        order: { type: 'string' },
        titleCol: { type: 'string' },
      },
    },
  },
};

// options for get one board
const getBoardOpts = {
  schema: {
    response: {
      200: boardSсhema,
    },
  },
  handler: getBoard,
};

// options for get all boards
const getBoardsOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: boardSсhema, //!
      },
    },
  },
  handler: getBoards,
};

// options for create board
const postBoardOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['title', 'columns'],
      titleTask: { type: 'string' },
      columns: {
        type: 'array',
        items: {
          order: { type: 'number' },
          title: { type: 'string' },
        },
      },
    },
    response: {
      201: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          columns: {
            type: 'array',
            items: {
              // id: { type: 'string' },
              order: { type: 'number' },
              titleCol: { type: 'string' },
            },
          },
        },
      },
    },
  },
  handler: addBoard,
};

// options for put one board
const putBoardOpts = {
  schema: {
    response: {
      200: boardSсhema,
    },
  },
  handler: putBoard,
};

// options for delete board
const deleteBoardOpts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
  handler: deleteBoard,
};

function userRoutes(server, options, done) {
  // GET all boards
  server.get('/boards', getBoardsOpts);

  // GET one board
  server.get('/boards/:boardId', getBoardOpts);

  // POST one board
  server.post('/boards', postBoardOpts);

  // PUT one board
  server.put('/boards/:userId', putBoardOpts);

  // DELETE one board
  server.delete('/boards/:userId', deleteBoardOpts);

  done();
}

module.exports = userRoutes;
