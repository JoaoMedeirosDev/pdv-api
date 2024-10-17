const clientsRepository = require('../../repositories/clients-repository');

async function findClientById(req, res) {
  const { id } = req.params;

  try {
    const client = await clientsRepository.findById(id);

    return res.json(client);
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno no servidor.' });
  }
}

module.exports = {
  findClientById,
};
