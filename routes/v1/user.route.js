const express = require('express');
const userController = require('../../controllers/users.controller');
const router = express.Router();

router.post('/signup', userController.signUp);


router.get('/list', userController.getAllUsers);


router.get('/:id', userController.getUserById );  


router.put('/update:id', userController.updateUser);  


router.delete('/delete:id', userController.deleteUser);


module.exports = router;
