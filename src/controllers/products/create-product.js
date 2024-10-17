const productsRepository = require('../../repositories/products-repository');
const { uploadImageBucket } = require('../../utils/upload-image-bucket');

async function createProduct(req, res) {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  const image = req.file;

  try {
    let product = await productsRepository.create({
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
    });

    const imageUrl = await uploadImageBucket(image, product.id);

    product = await productsRepository.save(product.id, {
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
      produto_imagem: imageUrl,
    });

    return res
      .status(201)
      .json({ message: 'Produto cadastrado com sucesso', product });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno no servidor.' });
  }
}

module.exports = { createProduct };
