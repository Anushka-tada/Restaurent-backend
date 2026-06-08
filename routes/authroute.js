const express = require('express');
const {registerUser , loginUser , logoutUser , getAllUsers , getSingleUser , deleteUser} = require('../controllers/auth.controller');
const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.get('/users' , getAllUsers);
router.get('/user/:id' , getSingleUser);
router.delete('/user/:id' , deleteUser);

module.exports = router;