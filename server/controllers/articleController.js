const mongoose = require('mongoose')
const express = require('express');
const asyncHandler = require('express-async-handler');

// importe le modele Article
const Article = require('../models/Articles')

// cree un nouvel article
exports.createArticle = asyncHandler(async (req, res) => {
  try {
    console.log('requete de creation bien recu');
    console.log(req.body);
    
    const newArticle = await Article.create(req.body);
    res.status(201).json({message: 'Article cree avec succees', newArticle});
    

  } catch (error) {
    console.error('Erreur lors de la creation de l\'article:', error);
    
    res.status(500).json({message: error.message});

  }
});

// mettre a jour un article
exports.updateArticle = async (req, res) => {
  const id = req.params.id;

  try {
    const updateArticle = await Article.findByIdAndUpdate(id, req.body, { new: true });
    if (!updateArticle) {
      return res.status(404).json({ message: 'Article non trouve!'});
    } else{
      return res.status(200).json(updateArticle);
    }
  }
   catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Supprimer un article
exports.deleteArticle = async (req, res) => {
  try {
    const articleToDelete = await Article.findByIdAndDelete(req.params.id);
    if (!articleToDelete) {
      return res.status(404).json({message: 'Article non trouve'})
    } else{
      res.status(200).json({ message: 'Article supprime'})
    }

  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

// recuperer tous les articles
exports.getAllArticles = async (req, res) => {
  try {
    const allArticles = await Article.find().populate('author');
    res.status(200).json(allArticles);
  } catch (error) {
    res.status(500).json({ message: error.message})
  }
}

// recuperer un article par ID
exports.getArticleById = async (req, res) => {
  try {
    const articleById = await Article.findById(req.params.id).populate('author');
    if (!articleById) {
      return res.status(404).json({ message: 'Article non trouve'})
    } else {
      return res.json(articleById)
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}