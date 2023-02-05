const Joi = require('joi');
const { BadInputError } = require('../utils/errors');

const body = Joi.object({
  urlLink: Joi.string().uri().required(),
});

const bodyValidation = (req, res, next) => {
  const { error } = body.validate(req.body);
  if (error) throw BadInputError('Invalid Input');
  next();
};

module.exports = { bodyValidation };
