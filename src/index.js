require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { userRoutes } = require('./routes/users');
const { productRoutes } = require('./routes/products');
const { clientRoutes } = require('./routes/clients');
const { categoryRoutes } = require('./routes/categories');
const { orderRoutes } = require('./routes/orders');
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(cors());

app.use(categoryRoutes);
app.use(userRoutes);
app.use(productRoutes);
app.use(clientRoutes);
app.use(orderRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});
