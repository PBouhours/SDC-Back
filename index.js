const express = require('express');
const app = express();
require('dotenv').config();

const cors = require('cors');
const connection = require('./src/config/dbconfig');

const port = process.env.PORT || 8000;

const routes = require('./src/routes/index');
app.use(cors());

app.use(express.json());

app.use('/', routes);

app.listen(port, function () {
  console.log(`Connected on port ${port}`);
});
