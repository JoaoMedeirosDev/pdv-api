const clientsRepository = require('../../repositories/clients-repository');

async function findClients(req, res) {
  try {
    const clients = await clientsRepository.findMany();

    return res.json(clients);
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno no servidor.' });
  }
}

module.exports = {
  findClients,
};
