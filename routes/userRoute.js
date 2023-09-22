const express = require('express');
const router = express.Router();
const { getAllUsers, postUser, deleteUser, findById,loginUser, logout}=require('../controllers/User.js')
router.get('/users',getAllUsers);
router.post('/signup',postUser);
router.post('/login',loginUser );
router.post('/logout', logout);
router.delete('/users/:userId', deleteUser);
router.get('/users/:userId', findById);
module.exports = router;