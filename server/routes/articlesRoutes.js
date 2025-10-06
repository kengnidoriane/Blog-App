const express = require('express');
const articleRouter = express.Router();
const { protect } = require('../middlewares/auth')

const articleController = require('../controllers/articleController');

articleRouter.post('/', protect, articleController.createArticle);
articleRouter.get('/', articleController.getAllArticles);
articleRouter.get('/categories', articleController.getCategories);
articleRouter.get('/:id', articleController.getArticleById);
articleRouter.put('/:id', protect, articleController.updateArticle);
articleRouter.delete('/:id', protect, articleController.deleteArticle);
articleRouter.post('/:id/like', protect, articleController.toggleLike);
articleRouter.get('/:id/like', protect, articleController.getLikeStatus);

module.exports = articleRouter;