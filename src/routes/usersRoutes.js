const express = require('express');

const router = express.Router();

const {getAllUsers, createUser, updateUser, deleteUser, logUser, getUser, updatePassword, newPassword } = require('../controllers/usersController.js');

router.get('/', getAllUsers);
router.post('/addUser', createUser);
router.post('/updateUser', updateUser);
router.delete('/:id', deleteUser);
router.post('/login', logUser);
router.get('/login', getUser);
router.post('/updatePassword', updatePassword);
router.post('/newPassword', newPassword);



module.exports = router;