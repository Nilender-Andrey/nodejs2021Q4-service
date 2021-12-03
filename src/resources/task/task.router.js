const {
  getTasks,
  getTask,
  addTask,
  deleteTasks,
  putTask,
} = require('./task.controllers');

// task shema
const getTaskSсhema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    order: { type: 'number' },
    description: { type: 'string' },
    userId: { type: ['string', 'null'] },
    boardId: { type: 'string' },
    columnId: { type: ['string', 'null'] },
  },
};

// options for get tasks in the board
const getTasksOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: getTaskSсhema,
      },
    },
  },
  handler: getTasks,
};

// options for get one task in the board
const getTaskOpts = {
  schema: {
    response: {
      200: getTaskSсhema,
    },
  },
  handler: getTask,
};

// options for create task
const postTaskOpts = {
  schema: {
    /*  body: {
      type: 'object',
      required: ['title', 'order', 'description', 'userId', 'columnId'], // 'columnId'
      titleTask: { type: 'string' },
      order: { type: 'number' },
      descriptionTask: { type: 'string' },
      userId: { type: ['string', 'null'] },
      columnId: { type: ['string', 'null'] },
    }, */
    response: {
      201: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          order: { type: 'number' },
          description: { type: 'string' },
          userId: { type: ['string', 'null'] },
          boardId: { type: 'string' },
          columnId: { type: ['string', 'null'] },
        },
      },
    },
  },
  handler: addTask,
};

// options for put one task
const putTaskOpts = {
  schema: {
    response: {
      200: getTaskSсhema,
    },
  },
  handler: putTask,
};

// options for delete task
const deleteTaskOpts = {
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
  handler: deleteTasks,
};

function taskRoutes(server, options, done) {
  // GET all users
  server.get('/boards/:boardId/tasks', getTasksOpts);

  // GET one user
  server.get('/boards/:boardId/tasks/:taskId', getTaskOpts);

  // POST one user
  server.post('/boards/:boardId/tasks', postTaskOpts);

  // PUT one user
  server.put('/boards/:boardId/tasks/:taskId', putTaskOpts);

  // DELETE one user
  server.delete('/boards/:boardId/tasks/:taskId', deleteTaskOpts);

  done();
}

module.exports = taskRoutes;
