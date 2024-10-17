const productsRepository = require('../repositories/products-repository');
const clientsRepository = require('../repositories/clients-repository');

async function verifyOrder(req, res, next) {
  const { cliente_id: clientId, pedido_produtos: orderProducts } = req.body;

  try {
    const client = await clientsRepository.findById(clientId);
    if (!client) {
      return res.status(404).json({ message: 'Cliente não encontrado.' });
    }

    for (let product of orderProducts) {
      const findProduct = await productsRepository.findById(product.produto_id);

      if (!findProduct) {
        return res.status(404).json({ message: 'Produto não encontrado.' });
      }

      if (findProduct.quantidade_estoque < product.quantidade_produto) {
        return res.status(400).json({
          message: 'Quantidade do produto pedido superior ao estoque.',
        });
      }
    }

    return next();
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno no servidor.' });
  }
}

module.exports = { verifyOrder };
