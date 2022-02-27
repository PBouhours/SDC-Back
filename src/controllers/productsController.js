const productsModel = require('../models/productsModel');

const getAllProducts = async (req, res) => {
  try {
    const results = await productsModel.getAllProducts();
    const findResult = results.filter((el) => !el.archive);
    res.status(200).json(findResult);
    console.log(results);
  } catch (err) {
    res.status(500).json(err);
  }
};

const searchProducts = async (req, response) => {
  const { query } = req.params;
  try {
    const results = await productsModel.search(query);
    const findResult = results.filter((el) => !el.archive);
    response.status(200).json(findResult);
    console.log(results);
  } catch (err) {
    response.status(500).json(err);
    console.log(err);
  }
};

const getAllProductsEvent = async (req, res) => {
  const { query } = req.params;
  try {
    const results = await productsModel.getAllProducts(query);
    const findResult = results.filter(
      (el) => el.quantité_evenement > 0 && !el.archive
    );
    res.status(200).json(findResult);
  } catch {
    res.status(500).json(err);
  }
};

const searchProductsEvent = async (req, response) => {
  const { query } = req.params;
  try {
    const results = await productsModel.search(query);
    const findResult = results.filter(
      (el) => el.quantité_evenement > 0 && !el.archive
    );
    response.status(200).json(findResult);
    console.log(results);
  } catch {
    response.status(500).json(err);
  }
};

const getProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await productsModel.getProduct(id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

const creatProduct = async (request, response) => {
  const product = request.body;
  try {
    const result = await productsModel.creatProduct(product);
    response.status(201).json({
      message: 'Created product',
      result,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
};

const deleteProduct = async (request, response) => {
  const id = request.params.id;
  try {
    const result = await productsModel.archiveProduct(id);
    response.status(200).json({
      message: 'Product deleted',
      result,
    });
  } catch (error) {
    response.status(500).json(error);
  }
};

const updateProduct = async (request, response) => {
  const id = request.params.id;
  const product = request.body;
  try {
    const result = await productsModel.updateProduct(product, id);
    response.status(200).json({
      message: 'Product updated',
      result,
    });
  } catch (error) {
    response.status(500).json(error);
  }
};

const updateProductEvent = async (request, response) => {
  const product = request.body;
  try {
    const result = await productsModel.updateProductEvent(product);
    response.status(200).json({
      message: 'Product updated',
      result,
    });
    console.log(result);
  } catch (error) {
    response.status(500).json(error);
  }
};

module.exports = {
  getAllProducts,
  creatProduct,
  deleteProduct,
  updateProduct,
  getProduct,
  updateProductEvent,
  getAllProductsEvent,
  searchProducts,
  searchProductsEvent,
};
