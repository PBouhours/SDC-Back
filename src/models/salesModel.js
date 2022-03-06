const { promise, query } = require('../config/dbconfig');
const connection = require('../config/dbconfig');

const creatSale = (idUser, idEvent, date,nameUser) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO vente (date, evenement_id, user_id, valide, remise, solde, nb_produit,user_name) VALUES (?,?,?,?,?,?,?,?)`,
      [date, idEvent, idUser, 0, 0, 0, 0,nameUser],
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

const invalideSale = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE vente SET valide = 9 WHERE valide = 0`,      
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  })
}

const verifySaleOpen = (idUser) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM vente WHERE valide = 0 AND user_id = ?',
      idUser,
      (err, result) => {
        if (err) {
          reject(err);
        }
        if (result.length) {
          resolve(true);
        } else if (!result.length) {
          resolve(false);
        }
      }
    );
  });
};

const getSaleOpen = (idUser, idEvent) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM vente WHERE valide = ? AND user_id = ? AND evenement_id = ?',
      [0, idUser, idEvent],
      (err, result) => {
        if (err) {
          reject(err);
        } else if (result.length) {
          resolve(result);
        } else if (!result.length) {
          resolve(false);
        }
      }
    );
  });
};

const getSale = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM vente WHERE id = ?',
      [id],
      (err, result) => {
        if (err) {
          reject(err);
        }
        if (result.length) {
          resolve(result);
        } else if (!result.length) {
          resolve(false);
        }
      }
    );
  });
};

const addProduct = (id, newQuantity, newSolde) => {
  console.log(id, newQuantity, newSolde);
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE vente SET nb_produit = ?, solde = ? WHERE id = ?`,
      [newQuantity, newSolde, id],
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

const getSaleForStore = (id) => {
  console.log(id);
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM vente WHERE user_id = ? AND valide = ?',
      [id, 0],
      (err, result) => {
        console.log(result);
        if (err) {
          reject(err);
        }
        if (result.length) {
          resolve(result);
        } else if (!result.length) {
          reject(false);
        }
      }
    );
  });
};

const updateRemise = (id, newRemise) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE vente SET remise = ? WHERE id = ?`,
      [newRemise, id],
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

const updateQuantitySale = (id, newQuantity) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE vente SET nb_produit = ? WHERE id = ?`,
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



const updateSolde = (id, newSolde) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE vente SET solde = ? WHERE id = ?`,
      [newSolde, id],
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

const validationSale = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE vente SET valide = 1 WHERE id = ?`,
      [id],
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
const inValidationSaleById = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE vente SET valide = 9 WHERE id = ?`,
      [id],
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

const updatePayType = (id, payType) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE vente SET pay_type = ? WHERE id = ?`,
      [payType, id],
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

const getSalesByIdUser = (idUser) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT vente.*, evenement.name as eventName FROM vente INNER JOIN evenement ON  evenement.id = vente.evenement_id WHERE user_id = ? AND valide = 1',
      idUser,
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

const getSalesByIdEvent = (idEvent) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM vente WHERE evenement_id = ? AND valide = 1',
      idEvent,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    )
  })
}

module.exports = {
  creatSale,
  verifySaleOpen,
  getSaleOpen,
  getSale,
  addProduct,
  getSaleForStore,
  updateRemise,
  updateSolde,
  validationSale,
  updatePayType,
  getSalesByIdUser,
  getSalesByIdEvent,
  invalideSale,
  inValidationSaleById,
  updateQuantitySale,
};
