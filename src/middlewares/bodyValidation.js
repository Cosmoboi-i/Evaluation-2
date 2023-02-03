const Joi = require('joi');
const { BadInputError } = require('../utils/errors');

const body = Joi.object({
  urlLink: Joi.string().uri().required(),
});

const bodyValidation = (schema) => (req, res, next) => {
  const { error } = body.validate(req.body);
  if (error) throw BadInputError('Url provided is not valid');
  next();
};

module.exports = { bodyValidation };