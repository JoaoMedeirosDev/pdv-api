const knex = require('../libs/database');

async function create(data) {
  const product = await knex('produtos').insert(data).returning('*');

  return product[0];
}

async function findById(id) {
  const product = await knex('produtos')
    .where({
      id,
    })
    .first();

  if (!product) {
    return null;
  }

  return product;
}

async function save(id, updatedData) {
  const updatedProduct = await knex('produtos')
    .where({ id })
    .update(updatedData)
    .returning('*');

  if (!updatedProduct) {
    return null;
  }
  return updatedProduct[0];
}

async function findMany(categoria_id) {
  const products = await knex('produtos')
    .where((builder) => {
      if (categoria_id) {
        builder.where('categoria_id', categoria_id);
      }
    })
    .select('*');

  return products;
}

async function deleteById(id) {
  const deleteProducts = await knex('produtos')
    .where({ id })
    .delete()
    .returning('*');

  if (!deleteProducts) {
    return null;
  }
  return deleteProducts[0];
}

async function isLinkedToOrder(productId) {
  const result = await knex('pedido_produtos')
    .where({ produto_id: productId })
    .first();

  return !!result;
}

module.exports = { create, save, findById, findMany, deleteById, isLinkedToOrder };
