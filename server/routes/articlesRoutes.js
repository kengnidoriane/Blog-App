const mongoose = require('mongoose');
const express = require('express');
const articleRouter = express.Router();
const { verifyToken } = require('../middlewares/auth')

const articleController = require('../controllers/articleController');

articleRouter.post('/', verifyToken, articleController.createArticle);
articleRouter.get('/', articleController.getAllArticles);
articleRouter.get('/:id', articleController.getArticleById);
articleRouter.put('/:id', verifyToken, articleController.updateArticle);
articleRouter.delete('/:id', verifyToken, articleController.deleteArticle);

module.exports = articleRouter;