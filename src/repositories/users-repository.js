const knex = require('../libs/database');

async function findByEmail(email) {
  const user = await knex('usuarios')
    .select('*')
    .where({
      email,
    })
    .first();

  if (!user) {
    return null;
  }

  return user;
}

async function findById(id) {
  const user = await knex('usuarios')
    .where({
      id,
    })
    .first();

  if (!user) {
    return null;
  }

  return user;
}
async function create({ nome, email, senha }) {
  const newUser = await knex('usuarios')
    .insert({
      nome,
      email,
      senha,
    })
    .returning('*');

  return newUser[0];
}
async function save(id, updatedData) {
  const updatedUser = await knex('usuarios')
    .where({ id })
    .update(updatedData)
    .returning('*');

  if (!updatedUser) {
    return null;
  }
  return updatedUser[0];
}

module.exports = {
  findByEmail,
  create,
  save,
  findById,
};
