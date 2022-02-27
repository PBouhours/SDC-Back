const { promise, query } = require('../config/dbconfig');
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

const search = (query) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM produit WHERE name LIKE ? OR ref LIKE ?`,
      [`%${query}%`, `%${query}%`],
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

const getProduct = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM produit WHERE id = ?`,
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

const creatProduct = ({ name, ref, cat, gender, size, price, quantity }) => {
  const quant = Number(quantity);
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO produit (name, ref, catégorie, genre, taille, prix, quantité) VALUES (?,?,?,?,?,?,?)`,
      [name, ref, cat, gender, size, price, quant],
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

const archiveProduct = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'UPDATE produit SET archive = 1 where id = ?',
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

const deleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('Delete FROM produit where id = ?', id, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const updateProduct = (data, id) => {
  const { name, ref, cat, gender, size, price, quantity } = data;
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE produit SET name = ?, ref = ?, catégorie = ?, genre = ?, taille = ?, prix = ?, quantité = ? WHERE id = ?`,
      [name, ref, cat, gender, size, price, quantity, id],
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

const updateProductEvent = (data) => {
  const { quantité_evenement, id } = data;
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE produit SET quantité_evenement = ? WHERE id = ?`,
      [quantité_evenement, id],
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

const updateQuantityProduct = (id, quantity) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE produit SET quantité = ? WHERE id = ?`,
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

const updateQuantityProductEvent = (id, quantity) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE produit SET quantité_evenement = ? WHERE id = ?`,
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

module.exports = {
  getAllProducts,
  creatProduct,
  deleteProduct,
  updateProduct,
  getProduct,
  updateProductEvent,
  updateQuantityProduct,
  updateQuantityProductEvent,
  archiveProduct,
  search,
};
