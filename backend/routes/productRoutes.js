const express = require('express');
const { getHome, getAllProducts, getProduct } = require('../controllers/productController');
const productRouter = new express.Router();

productRouter.get("/", getHome)

productRouter.get("/products", getAllProducts)

productRouter.get("/products/:id", getProduct)

module.exports = productRouter;