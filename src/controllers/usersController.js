const nodemailer = require('nodemailer');
const usersModel = require('../models/usersModel');
const jwt = require('jsonwebtoken');


const { JWT_AUTH_SECRET } = process.env;

const getAllUsers = async (req, res) => {
  try {
    const results = await usersModel.getAllUsers();
    const noUserArchived = results.filter((el) => !el.archive);
    res.status(200).json(noUserArchived);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createUser = async (req, res) => {
  const name = req.body.name;
  const mail = req.body.mail;
  const admin = req.body.admin;
  const actif = req.body.actif;
  const password = req.body.password;

  try {
    const exist = await usersModel.verifyUser(mail);
    if (!exist) {
      usersModel
        .createUser(name, mail, admin, actif, password)
        .then(() => {
          res.status(200).json({
            message: 'Created user',
          });
        })
        .catch((createError) => {
          res.status(500).json({
            message: 'failed creating user',
          });
          return createError;
        });
    } else {
      const unArchive = await usersModel.UnArchiveUser(mail);
      res
        .status(200)
        .json({ message: `Email ${mail} already used! User unarchived` });
    }
  } catch (err) {
    res.status.json(err);
  }
};

const updateUser = async (request, response) => {
  const user = request.body;
  try {
    const result = await usersModel.updateUser(user);
    response.status(200).json({
      message: 'User updated',
      result,
    });
  } catch (error) {
    response.status(500).json(error);
  }
};

const deleteUser = async (request, response) => {
  const id = request.params.id;
  try {
    const result = await usersModel.archiveUser(id);
    response.status(200).json({
      message: 'User deleted',
      result,
    });
  } catch (error) {
    response.status(500).json(error);
  }
};
const getUser = (req, res) => {
  if (req.headers.authorization !== undefined) {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, JWT_AUTH_SECRET, (err) => {
      if (err) {
        res.status(200).send({ loggedIn: false });
      } else {
        res.status(200).send({ loggedIn: true });
      }
    });
  } else {
    res.status(200).send({ loggedIn: false });
  }
};

const logUser = async (request, response) => {
  const { mail, password } = request.body;
  try {
    const actif = await usersModel.actifUser(mail);
    if (actif === true) {
      const result = await usersModel.logUser(mail, password);

      if (result.length !== 0) {
        const token = jwt.sign(
          { id: result.id, admin: result.admin },
          JWT_AUTH_SECRET,
          {
            expiresIn: '12h',
          }
        );
        response.status(200).json({
          message: mail,
          result,
          token,
        });
      } else {
        response.status(404).json({ error: `No user with mail ${mail}` });
      }
    } else {
      response.status(403).json({ error: 'Bloqued account' });
    }
  } catch (err) {
    response.status(500).json(err);
  }
};

const updatePassword = async (request, response) => {
  const { mail, password, newPassword } = request.body;
  try {
    const exist = await usersModel.verifyUser(mail);
    if (exist) {
      const goodPassword = await usersModel.verifyPassword(mail, password);

      if (goodPassword) {
        const result = await usersModel.updatePassword(mail, newPassword);
        response.status(200).json({
          message: 'Password updated',
          result: result,
        });
      } else {
        response.status(404).json({ error: 'bad Password' });
      }
    } else {
      response.status(404).json({ error: 'unknown account' });
    }
  } catch (error) {
    response.status(500).json(error);
  }
};

const newPassword = async (request, response) => {
  const { mail } = request.body;
  const { password } = request.body;
  try {
    const exist = await usersModel.verifyUser(mail);
    if (exist) {
      usersModel
        .updatePassword(mail, password)
        .then(() => {
          response.status(200).json({
            message: 'created new password',
          });
        })
        .catch((createError) => {
          response.status(500).json({
            message: 'failed updating password',
          });
          return createError;
        });
    } else {
      response.status(404).json({ error: 'Unknown account' });
    }
  } catch {
    response.status(500).json({ error: 'error' });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  logUser,
  getUser,
  updatePassword,
  newPassword,
};
