const { promise, query } = require('../config/dbconfig');
const connection = require('../config/dbconfig');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM user`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM user WHERE id = ?`,id , (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const verifyUser = (mail) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM user WHERE mail = ?',
      [mail],
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

const getIdFromMail = (mail) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT id FROM user WHERE mail = ?',
      [mail],
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

const getNameUserfromMail = (mail) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT name FROM user WHERE mail = ?',
      [mail],
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

const createUser = (name, mail, admin, actif, password) => {
  console.log(name);

  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        reject(err);
      }
      connection.query(
        'INSERT INTO user (name, mail, password, admin, actif, archive) VALUES (?, ?, ?, ?, ?, ?)',
        [name, mail, hash, admin, actif, 0],
        (error, result) => {
          if (err) {
            reject(error);
          } else {
            resolve(result);
            console.log(result);
          }
        }
      );
    });
  });
};

const updateUser = (data) => {
  const { mail, admin, actif } = data;
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE user SET admin = ?, actif = ? WHERE mail = ?`,
      [admin, actif, mail],
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

const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('Delete FROM user where id = ?', id, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};


const archiveUser = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('UPDATE user SET archive = 1 where id = ?', id, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const UnArchiveUser = (mail) => {
  return new Promise((resolve, reject) => {
    connection.query('UPDATE user SET archive = 0 where mail = ?', mail, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};



const actifUser = (mail) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT actif, archive FROM user WHERE mail = ?',
      [mail],
      (err, result) => {
        if (err) {
          reject(err);
        } else if (result[0].actif == 1 && result[0].archive == 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    );
  });
};

const verifyPassword = (mail, password) => {
  console.log(mail);
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM user WHERE mail = ?',
      mail,
      (err, result) => {
        console.log(result);
        if (err) {
          reject(err);
        } else if (result.length > 0) {
          bcrypt.compare(password, result[0].password, (error, response) => {
            if (error) {
              reject(error);
            } else {
              resolve(true);
            }
          });
        } else {
          resolve(false);
        }
      }
    );
  });
};

const updatePassword = (mail, newPassword) => {
  console.log(mail, newPassword);
  return new Promise((resolve, reject) => {
    bcrypt.hash(newPassword, saltRounds, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        connection.query(
          'UPDATE user SET password = ? WHERE mail = ?',
          [hash, mail],
          (error, result) => {
            if (err) {
              reject(error);
            } else {
              resolve(result);
              console.log(result);
            }
          }
        );
      }
    });
  });
};

const logUser = (mail, password) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM user WHERE mail = ?',
      mail,
      (err, result) => {
        console.log(result);
        if (err) {
          reject(err);
        } else if (result.length > 0) {
          bcrypt.compare(password, result[0].password, (error, response) => {
            if (error) {
              const mess = {
                message: 'Wrong login',
              };
              reject(mess);
            }
            if (response) {
              resolve(result);
            } else {
              const message = {
                message: 'bad password',
              };
              reject(message);
            }
          });
        } else {
          const error = {
            message: 'User doesn t exist',
          };
          reject(error);
        }
      }
    );
  });
};

const updateCAUser = (id, CA) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE user SET CA = ? WHERE id = ?`,
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

const updateNbSale = (id, nbSale) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE user SET nb_vente = ? WHERE id = ?`,
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

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  verifyUser,
  updateUser,
  deleteUser,
  logUser,
  actifUser,
  verifyPassword,
  updatePassword,
  getIdFromMail,
  updateCAUser,
  updateNbSale,
  getNameUserfromMail,
  archiveUser,
  UnArchiveUser,
};
