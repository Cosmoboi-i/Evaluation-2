const Joi = require('joi');
const { BadInputError } = require('../utils/errors');

const csvInput = Joi.object({
  urlLink: Joi.string().uri().required(),
});

const ceo = Joi.object({
  ceo: Joi.string().required(),
});



const urlValidation = (req, res, next) => {
  const { error } = csvInput.validate(req.body);
  if (error) throw BadInputError('Invalid Input');
  next();
};

const ceoValidation = (req, res, next) => {
  const { error } = ceo.validate(req.body);
  if (error) throw BadInputError('Invalid Input');
  next();
};

module.exports = { urlValidation, ceoValidation };
