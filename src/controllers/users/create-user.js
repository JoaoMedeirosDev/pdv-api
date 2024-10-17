const usersRepository = require('../../repositories/users-repository');
const bcrypt = require('bcrypt');

async function createUser(req, res) {
  req.body.email = req.body.email.toLowerCase();
  const { nome, email, senha } = req.body;

  try {
    const emailExists = await usersRepository.findByEmail(email);
    if (emailExists) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }
    const hashedPassword = await bcrypt.hash(senha, 10);

    const newUser = await usersRepository.create({
      nome,
      email,
      senha: hashedPassword,
    });

    delete newUser.senha;

    return res
      .status(201)
      .json({ message: 'Usuário cadastrado com sucesso', user: newUser });
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno no servidor' });
  }
}

module.exports = { createUser };
