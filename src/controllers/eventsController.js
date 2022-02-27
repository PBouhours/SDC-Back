const { json } = require('express/lib/response');
const eventsModel = require('../models/eventsModel');
const salesModel = require('../models/salesModel');

const getAllEvents = async (req, res) => {
  try {
    const results = await eventsModel.getAllEvents();
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createEvent = async (req, res) => {
  const event = req.body;
  try {
    const open = await eventsModel.verifyEventOpen();
    if (!open) {
      const result = await eventsModel.createEvent(event);
      res.status(200).json({
        message: 'Created event',
        result,
      })
    } else {
      res.status(200).json({
        message: 'A event is already open',
        
      })
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const closeEvent = async (req, response) => {
  const id = req.params.id;
  try {
    const close = await eventsModel.closeStatus(id);
    const invalidSales = await salesModel.invalideSale();
    if(close) {
      response.status(200).json({message: 'Event close'})
    } else {
      response.status(404).json({error: 'Event no close'})
    }
  }
  catch {
    response.status(500).json(error)
  }
}

const getEventWithSales = async (req, response) => {
  const id = req.params.id;
  try{
    const event = await eventsModel.getEventById(id);
    if (event) {
      const sales = await salesModel.getSalesByIdEvent(id);
      if (sales) {
        response.status(200).json({event, sales})
      } else {
        response.status(404).json({error : 'sales no found'})
      }
    } else {
      response.status(404).json({error : 'event no found'})
    }
  }
  catch{
    response.status(500);json(error)
  }
}

const updatebaseCash = async (req, response) => {
  const id = req.body.id;
  const cash = req.body.fond_caisse;
  try {
    const newCash = await eventsModel.updateCash(id, cash);
    if (newCash) {
      response.status(200).json({error : 'fond_caisse change'})
    } else {
      response.status(404).json({error : 'Fond_caisse no change'})
    }
  }
  catch {
    response.status(500).json(error)
  }
}


module.exports = {getAllEvents, createEvent, closeEvent, getEventWithSales, updatebaseCash};