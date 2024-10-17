async function findProductById(req, res) {
  try {
    const product = req.product;
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno no servidor' });
  }
}

module.exports = { findProductById };
