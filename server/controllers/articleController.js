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

// Récupérer tous les articles avec recherche et filtrage
exports.getAllArticles = async (req, res) => {
  try {
    const { search, category, page = 1, limit = 10 } = req.query;
    const query = {};
    
    // Recherche par mots-clés
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Filtrage par catégorie
    if (category) {
      query.category = category;
    }
    
    const articles = await Article.find(query)
      .populate('author', 'name username')
      .sort({ createDate: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
      
    const total = await Article.countDocuments(query);
    
    res.status(200).json({
      articles,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer les catégories disponibles
exports.getCategories = async (req, res) => {
  try {
    const categories = await Article.distinct('category');
    res.status(200).json(categories.filter(cat => cat));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
};

// Liker/Unliker un article
exports.toggleLike = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }

    const userId = req.user._id;
    const hasLiked = article.likes.includes(userId);

    if (hasLiked) {
      // Retirer le like
      article.likes = article.likes.filter(id => id.toString() !== userId.toString());
      article.likesCount = Math.max(0, article.likesCount - 1);
    } else {
      // Ajouter le like
      article.likes.push(userId);
      article.likesCount += 1;
    }

    await article.save();
    res.status(200).json({ 
      liked: !hasLiked, 
      likesCount: article.likesCount 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir le statut de like d'un utilisateur
exports.getLikeStatus = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }

    const userId = req.user._id;
    const hasLiked = article.likes.includes(userId);

    res.status(200).json({ 
      liked: hasLiked, 
      likesCount: article.likesCount 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};