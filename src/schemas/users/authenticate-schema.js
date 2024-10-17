const Joi = require('joi');

const authenticateSchema = Joi.object({
  email: Joi.string().empty().required().email().messages({
    'any.required': 'O email é um campo obrigatório.',
    'string.email': 'O email é inválido.',
    'string.base': 'O email é inválido.',
    'string.empty': 'O email não pode ser vazio.',
  }),

  senha: Joi.string().empty().required().messages({
    'any.required': 'A senha é um campo obrigatório.',
    'string.empty': 'A senha não pode ser vazia.',
  }),
});

module.exports = { authenticateSchema };
