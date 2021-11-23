const productsModel = require('../models/productsModel');

const getAllProducts = async (req, res) => {
  try {
    const results = await productsModel.getAllProducts();
    res.status(200).json(results);
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
    })
  } catch (error) {
    response.status(500).json(error)
  }
}

const deleteProduct = async (request, response) => {
  const id = request.params.id;
  try {
    const result = await productsModel.deleteProduct(id);
    response.status(200).json({
      message:'Product deleted',
      result,
    });
  } catch (error) {
      response.status(500).json(error)
  }
};

const updateProduct = async (request, response) => {
  const id = request.params.id;
  const product = request.body;
  try {
    const result = await productsModel.updateProduct(product,id);
    response.status(200).json({
      message:'Product updated',
      result,
    });
  } catch (error) {
      response.status(500).json(error)
  }
};

module.exports = { getAllProducts,creatProduct, deleteProduct, updateProduct};