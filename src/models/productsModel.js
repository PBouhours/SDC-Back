const { promise } = require('../config/dbconfig');
const connection = require('../config/dbconfig');

const getAllProducts = () => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM produit`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const creatProduct = ({ name, ref, cat, gender, size, price, quantity }) => {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO produit (name, ref, catégorie, genre, taille, prix, quantité) VALUES (?,?,?,?,?,?,?)`,
    [name, ref, cat, gender, size, price, quantity],
    (err,result) => {
      if(err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  })
};

const deleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('Delete FROM produit where id = ?', id, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  })
};

const updateProduct = (data, id) => {
  const  {name, ref, cat, gender, size, price, quantity } = data;
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE produit SET name = ?, ref = ?, catégorie = ?, genre = ?, taille = ?, prix = ?, quantité = ? WHERE id = ?`, 
    [name, ref, cat, gender, size, price, quantity, id], 
    (err,result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {getAllProducts, creatProduct, deleteProduct, updateProduct};