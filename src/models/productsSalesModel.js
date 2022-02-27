const { promise, query } = require('../config/dbconfig');
const connection = require('../config/dbconfig');

const creatProductInSale = (
  idProduct,
  name,
  ref,
  genre,
  taille,
  quantity,
  price,
  idSale
) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO produit_vente (produit_id, name, ref, genre, taille, quantité, prix_unitaire, vente_id) VALUES (?,?,?,?,?,?,?,?)`,
      [idProduct, name, ref, genre, taille, quantity, price, idSale],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const getProductInSale = (idSale) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM produit_vente WHERE vente_id = ?',
      idSale,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const updateQuantityProductInSaleById = (id, quantity) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'UPDATE produit_vente SET quantité = ? WHERE id = ?',
      [quantity, id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const getProductByIdInSale = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM produit_vente WHERE id = ?',
      id,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const updateQuantity = (id, newQuantity) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE produit_vente SET quantité = ? WHERE id = ?`,
      [newQuantity, id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const deleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'Delete FROM produit_vente where id = ?',
      id,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

module.exports = {
  creatProductInSale,
  getProductInSale,
  updateQuantityProductInSaleById,
  getProductByIdInSale,
  updateQuantity,
  deleteProduct,
};
