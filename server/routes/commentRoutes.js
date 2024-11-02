const express = require('express');
const mongoose = require('mongoose')
const CommentRouter = express.Router();
const commentController = require('../controllers/commentController')


CommentRouter.post('/', commentController.createComment);
CommentRouter.get('/', commentController.getCommentsByArticle);
CommentRouter.delete('/', commentController.deleteComment);

module.exports = CommentRouter;