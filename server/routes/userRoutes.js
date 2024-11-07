const mongoose = require('mongoose');
const express = require('express');
const { verifyToken } = require('../middlewares/auth')

const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.post('/auth/register', userController.registerUser);
userRouter.post('/auth/login', userController.loginUser);
userRouter.get('/profile', userController.getUserProfile)

userRouter.post('/:userId/follow', verifyToken,  userController.followUser);
userRouter.post('/:userId/unfollow', verifyToken,  userController.unFollowUser);

userRouter.get('/:userId/followers',  userController.getFollowers);
userRouter.get('/:userId/following', verifyToken, userController.getFollowing);

userRouter.get('/', userController.getAllUsers);

module.exports = userRouter;