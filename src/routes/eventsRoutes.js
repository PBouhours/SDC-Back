const express = require('express');

const router = express.Router();

const { getAllEvents, createEvent, closeEvent, getEventWithSales, updatebaseCash} = require('../controllers/eventsController.js');

router.get('/', getAllEvents);
router.get('/:id', getEventWithSales);
router.post('/addEvent', createEvent);
router.put('/close-event/:id', closeEvent);
router.post('/update-base-cash', updatebaseCash);



module.exports = router;