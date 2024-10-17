const { Router } = require('express');
const { verifyBody } = require('../../middlewares/verify-body');
const { orderSchema } = require('../../schemas/orders/order-schema');
const { verifyOrder } = require('../../middlewares/verify-order');
const { createOrder } = require('../../controllers/order/create-order');
const { findOrders } = require('../../controllers/order/find-orders');

const orderRoutes = Router();

orderRoutes.post('/pedido', verifyBody(orderSchema), verifyOrder, createOrder);
orderRoutes.get('/pedido', findOrders);

module.exports = { orderRoutes };
