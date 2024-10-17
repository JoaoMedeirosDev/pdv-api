const usersRepository = require('../../repositories/users-repository');
const { compare } = require('bcrypt');
const jwt = require('jsonwebtoken');

async function authenticate(req, res) {
  req.body.email = req.body.email.toLowerCase();

  const { email, senha } = req.body;

  try {
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      return res.status(400).json({ message: 'Usuário ou senha inválidos.' });
    }

    const isPasswordCorrect = await compare(senha, user.senha);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Usuário ou senha inválidos.' });
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d',
      }
    );

    delete user.senha;

    return res.json({
      user,
      token,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno no servidor.' });
  }
}

module.exports = { authenticate };
