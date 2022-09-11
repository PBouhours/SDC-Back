const express = require('express');

const router = express.Router();

const {
  getAllProducts,
  getProduct,
  creatProduct,
  deleteProduct,
  updateProduct,
  updateProductEvent,
  getAllProductsEvent,
  searchProducts,
  searchProductsEvent,
} = require('../controllers/productsController');

const {
  addProductInSale,
  getStore,
  updateRemise,
  updateQuantity,
  deleteProductInStore,
  validateSale,
  getSalesByEmail,
  getSaleById,
  inValidateSale,
  annulationSale,
} = require('../controllers/salesController');

router.get('/', getAllProducts);
router.get('/event', getAllProductsEvent);
router.get('/:id', getProduct);
router.get('/search/:query', searchProducts);
router.get('/searchEvent/:query', searchProductsEvent);
router.post('/addProduct', creatProduct);
router.delete('/:id', deleteProduct);
router.put('/:id', updateProduct);
router.post('/updateProductEvent', updateProductEvent);
router.post('/addProductInSale', addProductInSale);
router.post('/store', getStore);
router.post('/update-remise', updateRemise);
router.post('/update-quantity-inStore', updateQuantity);
router.post('/deleteProduct-inStore', deleteProductInStore);
router.post('/validation-store', validateSale);
router.post('/invalidation-sale/:id', inValidateSale);
router.post('/annulation-sale/:id', annulationSale);
router.post('/sales-User', getSalesByEmail);
router.get('/sales-User/:id', getSaleById);

module.exports = router;
