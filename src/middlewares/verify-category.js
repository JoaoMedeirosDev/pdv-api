const categoriesRepository = require('../repositories/categories-repository');

async function verifyCategory(req, res, next) {
  const { categoria_id: categoryId } = req.body;

  try {
    const category = await categoriesRepository.findById(categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Categoria não encontrada.' });
    }

    return next();
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno no servidor.' });
  }
}

module.exports = { verifyCategory };
