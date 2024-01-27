const createError = require('http-errors');

const emptyDbError = () => {
  return createError(404, 'The database is empty');
};

const notFoundError = () => {
  return createError(400, 'The ID does not correspond to any employee');
};

const internalServerError = () => {
  return createError(500, 'Internal Server Error');
};

const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
  return;
};

module.exports = {
  emptyDbError,
  notFoundError,
  internalServerError,
  errorHandler,
};
