const { HTTPError } = require('../utils/errors');

const errorHandler = (err, req, res, next) => {
  if (err instanceof HTTPError) {
    res.status(err.status).json({ message: err.message });
    next();
  }
  res.status(500).json({ message: err.message });
  next();
};

module.exports = { errorHandler };

