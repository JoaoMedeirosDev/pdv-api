const Joi = require('joi');

const clientSchema = Joi.object({
  nome: Joi.string().required().trim().empty().messages({
    'any.required': 'O campo nome é obrigatório.',
    'string.base': 'O campo nome deve ser um texto válido.',
    'string.empty': 'O campo nome não deve ser vazio.',
  }),

  email: Joi.string().trim().empty().required().email().messages({
    'any.required': 'O email é um campo obrigatório.',
    'string.email': 'O email é inválido.',
    'string.base': 'O deve ser um texto válido.',
    'string.empty': 'O email não pode ser vazio.',
  }),

  cpf: Joi.string().trim().empty().required().messages({
    'any.required': 'O cpf é um campo obrigatório.',
    'string.base': 'O campo cpf deve ser um texto.',
    'string.empty': 'O cpf não pode ser vazio.',
  }),

  cep: Joi.string().trim().empty().messages({
    'string.base': 'O campo cep deve ser um texto válido.',
    'string.empty': 'O cep não pode ser vazio.',
  }),

  rua: Joi.string().trim().empty().messages({
    'string.base': 'O campo rua deve ser um texto válido.',
    'string.empty': 'O campo rua não pode ser vazio.',
  }),

  numero: Joi.string().trim().empty().messages({
    'string.base': 'O campo numero deve ser um texto válido.',
    'string.empty': 'O campo numero não pode ser vazio.',
  }),

  bairro: Joi.string().trim().empty().messages({
    'string.base': 'O campo bairro deve ser um texto válido.',
    'string.empty': 'O campo bairro não pode ser vazio.',
  }),

  cidade: Joi.string().trim().empty().messages({
    'string.base': 'O campo cidade deve ser um texto válido.',
    'string.empty': 'O campo cidade não pode ser vazio.',
  }),

  estado: Joi.string().trim().empty().messages({
    'string.base': 'O campo estado deve ser um texto válido.',
    'string.empty': 'O campo estado não pode ser vazio.',
  }),
});

module.exports = { clientSchema };
