const express = require('express');
const articleRouter = express.Router();
const { protect } = require('../middlewares/auth')

const articleController = require('../controllers/articleController');

articleRouter.post('/', protect , articleController.createArticle);
articleRouter.get('/', articleController.getAllArticles);
articleRouter.get('/:id', articleController.getArticleById);
articleRouter.put('/:id', protect, articleController.updateArticle);
articleRouter.delete('/:id', protect, articleController.deleteArticle);

module.exports = articleRouter;