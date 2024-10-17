const knex = require('../libs/database');

async function findMany() {
  const clients = await knex('clientes').select('*');

  return clients;
}

async function create(data) {
  const client = await knex('clientes').insert(data).returning('*');

  return client[0];
}

async function findByEmail(email) {
  const client = await knex('clientes')
    .where({
      email,
    })
    .first();

  return client;
}

async function findByCpf(cpf) {
  const client = await knex('clientes')
    .where({
      cpf,
    })
    .first();

  return client;
}

async function findById(id) {
  const client = await knex('clientes')
    .where({
      id,
    })
    .first();

  return client;
}

async function save(id, data) {
  const client = await knex('clientes')
    .where({
      id,
    })
    .update(data)
    .returning('*');

  return client[0];
}

module.exports = {
  create,
  findByEmail,
  findByCpf,
  findMany,
  findById,
  save,
};
