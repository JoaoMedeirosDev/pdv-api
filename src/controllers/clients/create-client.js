const clientsRepository = require('../../repositories/clients-repository');
const {
  removeSpecialCharacters,
} = require('../../utils/remove-special-characters');

async function createClient(req, res) {
  const clientData = Object.assign(req.body);

  clientData.cpf = removeSpecialCharacters(clientData.cpf);

  if (clientData.cep) {
    clientData.cep = removeSpecialCharacters(clientData.cep);
  }

  try {
    const emailAlreadyExists = await clientsRepository.findByEmail(
      clientData.email
    );

    if (emailAlreadyExists) {
      return res.status(409).json({ message: 'Email já cadastrado' });
    }

    const cpfAlreadyExists = await clientsRepository.findByCpf(clientData.cpf);

    if (cpfAlreadyExists) {
      return res.status(409).json({ message: 'Cpf já cadastrado' });
    }

    const client = await clientsRepository.create({
      ...clientData,
    });

    return res
      .status(201)
      .json({ message: 'Cliente cadastrado com sucesso.', client });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno no servidor.' });
  }
}

module.exports = { createClient };
