const express = require('express');
const app = express();
require('dotenv').config();
const pool = require('./dbconfig');

const port = process.env.PORT || 8000;
 
app.get('/', function (request, response) {
  pool.query("SELECT * FROM produit", function(err, results) {
    if (err) {
      response.status(404).json(err)
    } else {
      response.status(200).json(results)
    }
    
 })
})
 
app.listen(port, function () {
  console.log(`Connected on port ${port}`)
})