const usersRepository = require('../../repositories/users-repository');
const bcrypt = require('bcrypt');

async function updateUser(req, res) {
  req.body.email = req.body.email.toLowerCase();
  const userId = req.user.id;
  const { nome, email, senha } = req.body;

  try {
    const emailExists = await usersRepository.findByEmail(email);
    if (emailExists && emailExists.id !== userId) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);
    const updatedUser = await usersRepository.save(userId, {
      nome,
      email,
      senha: hashedPassword,
    });

    delete updatedUser.senha;
    return res
      .status(200)
      .json({ message: 'Usuário atualizado com sucesso', user: updatedUser });
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno no servidor' });
  }
}

module.exports = { updateUser };
