const Joi = require('joi');

const userSchema = Joi.object({
  nome: Joi.string().required().invalid(null).messages({
    'any.required': 'O campo nome é um campo obrigatório.',
    'string.base': 'O nome é um campo obrigatório.',
    'string.empty': 'O nome não pode ser vazio.',
    'any.invalid': 'O campo nome não pode ser nulo.',
  }),

  email: Joi.string().required().empty().email().invalid(null).messages({
    'any.required': 'O email é um campo obrigatório',
    'string.email': 'O email é um campo obrigatório.',
    'string.base': 'O email é inválido.',
    'string.empty': 'O email não pode ser vazio.',
  }),

  senha: Joi.string().required().empty().invalid(null).messages({
    'any.required': 'A senha é um campo obrigatório.',
    'string.empty': 'A senha não pode ser vazia.',
  }),
})
  .or('nome', 'email', 'senha')
  .required()
  .messages({
    'any.required': 'Todos os campos são obrigatórios.',
    'object.missing': 'Todos os campos são obrigatórios.',
  });

module.exports = {
  userSchema,
};
