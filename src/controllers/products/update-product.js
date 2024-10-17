const productsRepository = require('../../repositories/products-repository');
const { deleteImagemBucket } = require('../../utils/delete-image-bucket');
const { uploadImageBucket } = require('../../utils/upload-image-bucket');

async function updateProduct(req, res) {
  const id = req.params.id;
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  const image = req.file;

  try {
    const existProduct = await productsRepository.findById(id);

    if (!existProduct) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }

    if (existProduct.produto_imagem) {
      await deleteImagemBucket(existProduct.produto_imagem);
    }

    const imageUrl = await uploadImageBucket(image, id);

    const updatedProduct = await productsRepository.save(id, {
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
      produto_imagem: imageUrl,
    });

    return res.status(200).json({
      message: 'Produto atualizado com sucesso',
      product: updatedProduct,
    });
  } catch (error) {
    console.log(err.message);
    return res.status(500).json({ message: 'Erro interno no servidor' });
  }
}

module.exports = { updateProduct };
