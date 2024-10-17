const transport = require('../../libs/smtp');
const ordersRepository = require('../../repositories/orders-repository');
const productsRepository = require('../../repositories/products-repository');
const clientsRepository = require('../../repositories/clients-repository');
const compilerHtml = require('../../utils/compiler-Html');

async function createOrder(req, res) {
  const {
    cliente_id: clientId,
    observacao: observation,
    pedido_produtos: orderProducts,
  } = req.body;

  try {
    let totalSum = 0;
    for (let product of orderProducts) {
      const findProduct = await productsRepository.findById(product.produto_id);
      totalSum += findProduct.valor * product.quantidade_produto;
    }

    const order = await ordersRepository.createOrder({
      cliente_id: clientId,
      observacao: observation,
      valor_total: totalSum,
    });

    let arrayOrderProducts = [];
    for (let product of orderProducts) {
      const findProduct = await productsRepository.findById(product.produto_id);
      const productValue = findProduct.valor;

      const quantidade_estoque =
        findProduct.quantidade_estoque - product.quantidade_produto;

      await productsRepository.save(findProduct.id, {
        quantidade_estoque,
      });

      const orderProducts = await ordersRepository.createOrderProducts({
        pedido_id: order.id,
        produto_id: product.produto_id,
        quantidade_produto: product.quantidade_produto,
        valor_produto: productValue,
      });
      arrayOrderProducts.push(orderProducts);
    }

    const newOrder = {
      pedido: order,
      pedido_produtos: arrayOrderProducts,
    };

    const client = await clientsRepository.findById(clientId);

    const html = await compilerHtml('./src/templates/send-email-order.html', {
      nameClient: client.nome,
    });

    transport.sendMail({
      from: `${process.env.SMTP_NAME} <${process.env.SMTP_FROM}>`,
      to: `${client.nome} <${client.email}>`,
      subject: 'Notificação de pedido de produtos.',
      html,
    });

    return res.status(201).json({
      message: 'Pedido cadastrado com sucesso.',
      novo_pedido: newOrder,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno no servidor.' });
  }
}

module.exports = { createOrder };
