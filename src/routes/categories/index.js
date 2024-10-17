const { Router } = require('express');
const {
  findCategories,
} = require('../../controllers/categories/find-categories');

const categoryRoutes = Router();

categoryRoutes.get('/categoria', findCategories);

module.exports = { categoryRoutes };
