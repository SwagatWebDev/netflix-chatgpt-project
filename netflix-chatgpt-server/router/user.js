const express = require('express');

const userController = require('../controller/user')

const router = express.Router();

router
    .post('/', userController.createUser)
    .get('/', userController.getAllUsers)
    .get('/:id', userController.getUserById)
    .put('/:id', userController.replaceUser)
    .patch('/:id', userController.updatePartialUser)
    .delete('/:id', userController.deleteUser);

exports.router = router;
