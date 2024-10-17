const { verify, JsonWebTokenError } = require('jsonwebtoken');
const usersRepository = require('../repositories/users-repository');

async function verifyJwt(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Token obrigatório.' });
  }

  const [_, token] = req.headers.authorization.split(' ');

  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    const { id } = decoded;

    const user = await usersRepository.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    delete user.senha;
    req.user = user;

    return next();
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      return res.status(401).json({ message: 'Token inválido.' });
    }

    return res.status(500).json({ message: 'Erro interno no servidor.' });
  }
}

module.exports = { verifyJwt };
