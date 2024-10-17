const knex = require('../libs/database');

async function findMany() {
  const categories = await knex('categorias').select('*');

  return categories;
}

async function findById(id) {
  const category = await knex('categorias')
    .where({
      id,
    })
    .first();

  return category;
}

module.exports = {
  findMany,
  findById,
};
