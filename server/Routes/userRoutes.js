const express = require('express')
const router = express.Router();
const {getAllUsers, createUser, deleteUser, updateUser } = require('../Controllers/userController')


router.get('/', getAllUsers);
router.post('/',createUser);
router.delete('/:id', deleteUser);
router.patch('/:id', updateUser);

module.exports = router ; 