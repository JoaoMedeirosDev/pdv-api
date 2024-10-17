const productsRepository = require('../../repositories/products-repository');
const { deleteImagemBucket } = require('../../utils/delete-image-bucket');

async function deleteProduct(req, res) {
  const { id } = req.params;

  try {
    const isLinkedToOrder = await productsRepository.isLinkedToOrder(id);

    if (isLinkedToOrder) {
      return res
        .status(400)
        .json({
          message:
            'Este produto está vinculado a um pedido e não pode ser excluído.',
        });
    }
    const deletedProduct = await productsRepository.deleteById(id);
    await deleteImagemBucket(deletedProduct.produto_imagem);
    return res.status(200).json({
      message: 'Produto deletado com sucesso',
      product: deletedProduct,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno no servidor.' });
  }
}

module.exports = { deleteProduct };
