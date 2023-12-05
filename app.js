const express = require('express');
const bodyParser = require("body-parser");

const app = express();

const productsRoutes = require('./api/routes/products');

app.use(bodyParser.json());
app.use('/products', productsRoutes);

module.exports = app;