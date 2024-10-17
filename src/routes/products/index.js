const { Router } = require('express');
const { verifyJwt } = require('../../middlewares/verify-jwt');
const { findProducts } = require('../../controllers/products/find-products');
const { idParamSchema } = require('../../schemas/id-param-schema');
const { verifyProduct } = require('../../middlewares/verify-product');
const { findProductById } = require('../../controllers/products/find-product');
const { productSchema } = require('../../schemas/products/product-schema');
const { verifyCategory } = require('../../middlewares/verify-category');
const { createProduct } = require('../../controllers/products/create-product');
const { updateProduct } = require('../../controllers/products/update-product');
const { deleteProduct } = require('../../controllers/products/delete-products');
const { verifyIdParam } = require('../../middlewares/verify-id-param');
const { verifyBody } = require('../../middlewares/verify-body');
const { upload } = require('../../middlewares/upload');

const productRoutes = Router();

productRoutes.get('/produto', findProducts);
productRoutes.get(
  '/produto/:id',
  verifyIdParam(idParamSchema),
  verifyProduct,
  findProductById
);

productRoutes.post(
  '/produto',
  upload.single('produto_imagem'),
  verifyBody(productSchema),
  verifyCategory,
  createProduct
);

productRoutes.put(
  '/produto/:id',
  upload.single('produto_imagem'),
  verifyBody(productSchema),
  verifyCategory,
  updateProduct
);

productRoutes.delete(
  '/produto/:id',
  verifyIdParam(idParamSchema),
  verifyProduct,
  deleteProduct
);

module.exports = { productRoutes };
