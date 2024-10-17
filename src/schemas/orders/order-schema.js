const Joi = require('joi');

const orderSchema = Joi.object({
  cliente_id: Joi.number().required().messages({
    'any.required': 'O campo cliente_id é obrigatório.',
    'number.base': 'O campo cliente_id deve ser um número válido.',
  }),

  observacao: Joi.string().trim().empty().messages({
    'string.base': 'O campo observacao deve ser um texto.',
    'string.empty': 'O observacao não pode ser vazio.',
  }),

  pedido_produtos: Joi.array()
    .min(1)
    .items(
      Joi.object({
        produto_id: Joi.number().required().min(1).message({
          'any.required': 'O campo produto_id é obrigatório.',
          'number.base': 'O campo produto_id deve ser um número válido.',
          'number.min': 'O campo produto_id deve ser maior que 0.',
        }),
        quantidade_produto: Joi.number().required().min(1).message({
          'any.required': 'O campo quantidade_produto é obrigatório.',
          'number.base':
            'O campo quantidade_produto deve ser um número válido.',
          'number.min': 'O campo quantidade_produto deve ser maior que 0.',
        }),
      })
    )
    .required()
    .messages({
      'any.required': 'O campo pedido_produtos é obrigatório.',
      'array.min': 'O campo pedido_produtos deve ter no minimo um produto.',
    }),
});

module.exports = { orderSchema };
