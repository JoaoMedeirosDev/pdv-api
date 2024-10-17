const productsRepository = require('../repositories/products-repository');

async function verifyProduct(req, res, next) {
  const { id } = req.params;
    try {
    const product = await productsRepository.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }
    req.product = product;
    return next();
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno no servidor.' });
  }
}

module.exports = { verifyProduct };
