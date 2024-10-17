const productsRepository = require('../../repositories/products-repository');

async function findProducts(req, res) {
  try {
    const categoryId = req.query.categoria_id;

    if (categoryId) {
      const products = await productsRepository.findMany(categoryId);
      return res.json(products);
    }

    const allProducts = await productsRepository.findMany();
    return res.json(allProducts);
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno no servidor.' });
  }
}

module.exports = {
  findProducts,
};
