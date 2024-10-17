const { response } = require('express');
const clientsRepository = require('../../repositories/clients-repository');
const {
  removeSpecialCharacters,
} = require('../../utils/remove-special-characters');

async function editClient(req, res) {
  const clientId = req.params.id;

  const clientData = Object.assign(req.body);

  try {
    const client = await clientsRepository.findById(clientId);

    if (!client) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    clientData.cpf = removeSpecialCharacters(clientData.cpf);

    if (clientData.cep) {
      clientData.cep = removeSpecialCharacters(clientData.cep);
    }

    const emailAreadyExists = await clientsRepository.findByEmail(
      clientData.email
    );

    if (emailAreadyExists && emailAreadyExists.id !== client.id) {
      return res.status(409).json({ message: 'Email já cadastrado.' });
    }

    const cpfAlreadyExists = await clientsRepository.findByCpf(clientData.cpf);

    if (cpfAlreadyExists && cpfAlreadyExists.id !== client.id) {
      return res.status(409).json({ message: 'Cpf já cadastrado.' });
    }

    const clientUpdated = await clientsRepository.save(clientId, clientData);

    return res.status(200).json({
      message: 'Cliente atualizado com sucesso.',
      client: clientUpdated,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno no servidor.' });
  }
}

module.exports = { editClient };
