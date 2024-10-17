const categoriesRepository = require('../../repositories/categories-repository');

async function findCategories(req, res) {
  try {
    const categories = await categoriesRepository.findMany();

    return res.json(categories);
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno no servidor.' });
  }
}

module.exports = { findCategories };
