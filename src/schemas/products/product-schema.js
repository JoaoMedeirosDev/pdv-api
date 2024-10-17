const Joi = require('joi');

const productSchema = Joi.object({
  descricao: Joi.string().required().trim().empty().messages({
    'any.required': 'O campo descrição é obrigatório.',
    'string.base': 'O campo descrição deve ser um texto válido.',
    'string.empty': 'O campo descrição não deve ser vazio.',
  }),

  quantidade_estoque: Joi.number().required().min(1).messages({
    'any.required': 'O campo quantidade_estoque é obrigatório.',
    'number.base': 'O campo quantidade_estoque deve ser um número válido.',
    'number.min': 'O campo quantidade_estoque deve ser maior que 0.',
  }),

  valor: Joi.number().required().min(1).messages({
    'any.required': 'O campo valor é obrigatório',
    'number.base': 'O campo valor deve ser um número válido',
    'number.min': 'O campo valor deve ser maior que 0.',
  }),

  categoria_id: Joi.number().required().messages({
    'any.required': 'O campo categoria_id é obrigatório',
    'number.base': 'O campo categoria_id deve ser um número válido.',
  }),
});

module.exports = { productSchema };
