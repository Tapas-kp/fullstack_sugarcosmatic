const express = require('express');
const { registerUser, loginUser, refreshUser, logoutUser } = require('../controllers/authController');
const userRouter = express.Router();

userRouter.post('/register',registerUser);

userRouter.post('/login', loginUser);

userRouter.get('/logout', logoutUser);

userRouter.get('/refresh',refreshUser);

module.exports = userRouter;