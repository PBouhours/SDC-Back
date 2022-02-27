const { promise, query } = require('../config/dbconfig');
const connection = require('../config/dbconfig');

const getAllEvents = () => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM evenement`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const getEventById = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM evenement WHERE id =?`,
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

const verifyEventOpen = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM evenement WHERE status = 1',
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

const getEventOpen = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM evenement WHERE status = 1',
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

const createEvent = ({ name, date, fond_caisse }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'INSERT INTO evenement (name, date, fond_caisse, status) VALUES (?, ?, ?, 1)',
      [name, date, fond_caisse],
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

const updateNbSale = (id, nbSale) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE evenement SET nb_vente = ? WHERE id = ?`,
      [nbSale, id],
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

const updateCash = (id, fond) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE evenement SET fond_caisse = ? WHERE id = ?`,
      [fond, id],
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

const updateCA = (id, CA) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE evenement SET CA = ? WHERE id = ?`,
      [CA, id],
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

const updateSoldeCB = (id, soldeCB) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE evenement SET solde_cb = ? WHERE id = ?`,
      [soldeCB, id],
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

const updateSoldeEspece = (id, soldeEspece) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE evenement SET solde_espece = ? WHERE id = ?`,
      [soldeEspece, id],
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

const updateSoldeCheque = (id, soldeCheque) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE evenement SET solde_cheque = ? WHERE id = ?`,
      [soldeCheque, id],
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

const updateRemise = (id, remise) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE evenement SET total_remise = ? WHERE id = ?`,
      [remise, id],
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

const closeStatus = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'UPDATE evenement SET status = 0 WHERE id = ?',
      id,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  verifyEventOpen,
  getEventOpen,
  updateNbSale,
  updateCA,
  updateSoldeCB,
  updateSoldeEspece,
  updateSoldeCheque,
  updateRemise,
  closeStatus,
  updateCash
};
