const clientsRepository = require('../repositories/clients-repository');

async function verifyClient(req, res, next) {
  const { id: clientId } = req.params;

  const client = await clientsRepository.findById(clientId);

  if (!client) {
    return res.status(404).json({ message: 'Cliente não encontrado.' });
  }

  return next();
}

module.exports = { verifyClient };
