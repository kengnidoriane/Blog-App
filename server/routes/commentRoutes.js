const express = require('express');
const CommentRouter = express.Router({ mergeParams: true });
const { protect } = require('../middlewares/auth');
const commentController = require('../controllers/commentController');

// Routes pour les commentaires d'un article spécifique
CommentRouter.post('/', protect, commentController.createComment);
CommentRouter.get('/', commentController.getCommentsByArticle);
CommentRouter.put('/:id', protect, commentController.updateComment);
CommentRouter.delete('/:id', protect, commentController.deleteComment);

module.exports = CommentRouter;