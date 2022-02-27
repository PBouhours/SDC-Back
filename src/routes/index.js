const express = require('express');
const productsRoutes = require('./productsRoutes');
const eventsRoutes = require('./eventsRoutes');
const usersRoutes = require('./usersRoutes');

const router = express.Router();

router.use('/products', productsRoutes);
router.use('/events', eventsRoutes);
router.use('/users', usersRoutes);

module.exports = router;
