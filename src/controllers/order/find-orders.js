const ordersRepository = require('../../repositories/orders-repository');

async function findOrders(req, res) {
  const clientId = req.query.cliente_id;
  try {
    const pedido = await ordersRepository.findOrdersProducts(clientId);

    return res.json({ pedido });
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno no servidor.' });
  }
}

module.exports = {
  findOrders,
};
