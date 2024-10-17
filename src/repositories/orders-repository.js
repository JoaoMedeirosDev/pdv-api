const knex = require('../libs/database');

async function findById(id) {
  const order = await knex('pedidos')
    .where({
      id,
    })
    .first();

  return order;
}

async function createOrder(data) {
  const order = await knex('pedidos').insert(data).returning('*');

  return order[0];
}

async function createOrderProducts(data) {
  const orderProducts = await knex('pedido_produtos')
    .insert(data)
    .returning('*');

  return orderProducts[0];
}

async function findOrdersProducts(cliente_id) {
  const orderProducts = await knex('pedidos as p')
    .select('p.*', knex.raw('array_agg(to_json(pp)) as pedido_produtos'))
    .leftJoin('pedido_produtos as pp', 'p.id', 'pp.pedido_id')
    .groupBy('p.id')
    .where((builder) => {
      if (cliente_id) {
        builder.where({ cliente_id });
      }
    });
  return orderProducts;
}

module.exports = {
  findById,
  createOrder,
  createOrderProducts,
  findOrdersProducts,
};
