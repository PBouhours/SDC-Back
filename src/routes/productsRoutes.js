const express = require('express');

const router = express.Router();

const {
  getAllProducts,
  creatProduct,
  deleteProduct,
  updateProduct,
} = require('../controllers/productsController');

router.get('/', getAllProducts);
router.post('/addProduct', creatProduct);
router.delete('/:id', deleteProduct);
router.put('/:id', updateProduct)

module.exports = router;