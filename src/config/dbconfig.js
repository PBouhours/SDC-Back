require('dotenv').config();
const mysql = require('mysql2');

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const connection = mysql.createPool(config);

connection.getConnection((err) => {
  if (err) {
    console.error('connection err', err);
  } else {
    console.log('Database connected');
  }
});

module.exports = connection;
