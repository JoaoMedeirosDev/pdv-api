const Joi = require('joi');

const idParamSchema = Joi.object({
  id: Joi.number().messages({
    'number.base': 'O parâmetro deve ser um número válido.',
  }),
});

module.exports = { idParamSchema };
