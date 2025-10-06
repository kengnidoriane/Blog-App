const mongoose = require('mongoose')
const express = require('express');
const asyncHandler = require('express-async-handler');
const NotificationService = require('../services/notificationService');
const { cache } = require('../config/cache');
const logger = require('../config/logger');

// importe le modele Article
const Article = require('../models/Articles')

// cree un nouvel article
exports.createArticle = asyncHandler(async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;
    
    const newArticle = await Article.create({
      title,
      content,
      author: req.user._id,
      category: category || 'technologie',
      tags: tags || []
    });
    
    await newArticle.populate('author', 'name username');
    
    // Invalider tout le cache des articles
    const cacheKeys = [
      'articles:all:all:1:10',
      'articles:all:all:1:20',
      'articles:all:all:2:10'
    ];
    for (const key of cacheKeys) {
      await cache.del(key);
    }
    
    // Notification pour les followers (optionnel)
    try {
      const io = req.app.get('io');
      io.emit('newArticle', {
        title: newArticle.title,
        author: newArticle.author.name,
        id: newArticle._id
      });
    } catch (error) {
      logger.error('Erreur notification article:', error);
    }
    
    res.status(201).json(newArticle);
    
  } catch (error) {
    logger.error('Erreur lors de la creation de l\'article:', error);
    res.status(500).json({message: error.message});
  }
});

// mettre a jour un article
exports.updateArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }
    
    // Vérifier que l'utilisateur est l'auteur
    if (article.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Non autorisé à modifier cet article' });
    }
    
    const updatedArticle = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('author', 'name username');
    
    // Invalider le cache
    await cache.del(`article:${req.params.id}`);
    await cache.del('articles:all:all:1:10');
    
    res.status(200).json(updatedArticle);
  } catch (error) {
    logger.error('Erreur updateArticle:', error);
    res.status(500).json({ message: error.message });
  }
}

// Supprimer un article
exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }
    
    // Vérifier que l'utilisateur est l'auteur
    if (article.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Non autorisé à supprimer cet article' });
    }
    
    await Article.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Article supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Récupérer tous les articles avec recherche et filtrage
exports.getAllArticles = async (req, res) => {
  try {
    const { search, category, page = 1, limit = 10 } = req.query;
    const cacheKey = `articles:${search || 'all'}:${category || 'all'}:${page}:${limit}`;
    
    // Vérifier le cache
    const cachedData = await cache.get(cacheKey);
    if (cachedData) {
      return res.status(200).json(cachedData);
    }
    
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
      .skip((page - 1) * limit)
      .lean(); // Optimisation MongoDB
      
    // Créer un extrait du contenu pour chaque article
    const articlesWithExcerpt = articles.map(article => {
      let excerpt = '';
      if (article.content) {
        // Nettoyer le HTML/Markdown et créer un extrait
        excerpt = article.content
          .replace(/<[^>]*>/g, '') // Supprimer HTML
          .replace(/[#*_`~\[\]()]/g, '') // Supprimer Markdown
          .replace(/\s+/g, ' ') // Normaliser espaces
          .trim()
          .substring(0, 150);
        
        if (excerpt.length === 150) excerpt += '...';
        if (!excerpt) excerpt = 'Contenu disponible dans l\'article complet';
      }
      
      return {
        ...article,
        content: excerpt
      };
    });
      
    const total = await Article.countDocuments(query);
    
    const result = {
      articles: articlesWithExcerpt,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total
    };
    
    // Mettre en cache pour 5 minutes
    await cache.set(cacheKey, result, 300);
    
    res.status(200).json(result);
  } catch (error) {
    logger.error('Erreur getAllArticles:', error);
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
    const cacheKey = `article:${req.params.id}`;
    
    // Vérifier le cache
    const cachedArticle = await cache.get(cacheKey);
    if (cachedArticle) {
      return res.json(cachedArticle);
    }
    
    const articleById = await Article.findById(req.params.id)
      .populate('author', 'name username')
      .lean();
      
    if (!articleById) {
      return res.status(404).json({ message: 'Article non trouve'})
    }
    
    // Mettre en cache pour 10 minutes
    await cache.set(cacheKey, articleById, 600);
    
    return res.json(articleById);

  } catch (error) {
    logger.error('Erreur getArticleById:', error);
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
    
    // Empêcher de liker son propre article
    if (article.author.toString() === userId.toString()) {
      return res.status(403).json({ message: 'Vous ne pouvez pas liker votre propre article' });
    }
    
    const hasLiked = article.likes.includes(userId);

    if (hasLiked) {
      // Retirer le like
      article.likes = article.likes.filter(id => id.toString() !== userId.toString());
      article.likesCount = Math.max(0, article.likesCount - 1);
    } else {
      // Ajouter le like
      article.likes.push(userId);
      article.likesCount += 1;
      
      // Créer notification
      try {
        const notification = await NotificationService.createNotification({
          recipient: article.author,
          sender: userId,
          type: 'like',
          message: `a aimé votre article "${article.title}"`,
          articleId: article._id
        });
        
        // Envoyer notification en temps réel
        const io = req.app.get('io');
        io.to(article.author.toString()).emit('newNotification', notification);
      } catch (notifError) {
        console.error('Erreur notification:', notifError);
      }
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