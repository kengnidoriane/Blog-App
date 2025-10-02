const Comment = require('../models/Comments');
const { protect } = require('../middlewares/auth');

// Créer un commentaire ou une réponse
exports.createComment = async (req, res) => {
  try {
    const { content, articleId, parentComment } = req.body;
    const newComment = new Comment({
      content,
      author: req.user._id,
      articleId,
      parentComment: parentComment || null
    });

    const savedComment = await newComment.save();
    await savedComment.populate('author', 'name username');
    
    // Incrémenter le compteur de réponses du commentaire parent
    if (parentComment) {
      await Comment.findByIdAndUpdate(parentComment, {
        $inc: { repliesCount: 1 }
      });
    }
    
    // Incrémenter le compteur de commentaires de l'article
    await Article.findByIdAndUpdate(articleId, {
      $inc: { commentsCount: 1 }
    });
    
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du commentaire', error: error.message });
  }
};

// Récupérer tous les commentaires pour un article donné
exports.getCommentsByArticle = async (req, res) => {
  try {
    // Récupérer les commentaires principaux (sans parent)
    const mainComments = await Comment.find({ 
      articleId: req.params.articleId,
      parentComment: null
    })
      .populate('author', 'name username')
      .sort({ createdAt: -1 });
    
    // Pour chaque commentaire principal, récupérer ses réponses
    const commentsWithReplies = await Promise.all(
      mainComments.map(async (comment) => {
        const replies = await Comment.find({ parentComment: comment._id })
          .populate('author', 'name username')
          .sort({ createdAt: 1 });
        return {
          ...comment.toObject(),
          replies
        };
      })
    );
    
    res.status(200).json(commentsWithReplies);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des commentaires', error: error.message });
  }
};

// Modifier un commentaire
exports.updateComment = async (req, res) => {
  try {
    const { content } = req.body;
    const comment = await Comment.findById(req.params.id);
    
    if (!comment) {
      return res.status(404).json({ message: 'Commentaire non trouvé' });
    }
    
    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Non autorisé à modifier ce commentaire' });
    }
    
    comment.content = content;
    await comment.save();
    await comment.populate('author', 'name username');
    
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la modification du commentaire', error: error.message });
  }
};

// Liker/Unliker un commentaire
exports.toggleCommentLike = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Commentaire non trouvé' });
    }

    const userId = req.user._id;
    const hasLiked = comment.likes.includes(userId);

    if (hasLiked) {
      comment.likes = comment.likes.filter(id => id.toString() !== userId.toString());
      comment.likesCount = Math.max(0, comment.likesCount - 1);
    } else {
      comment.likes.push(userId);
      comment.likesCount += 1;
    }

    await comment.save();
    res.status(200).json({ 
      liked: !hasLiked, 
      likesCount: comment.likesCount 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer un commentaire
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    
    if (!comment) {
      return res.status(404).json({ message: 'Commentaire non trouvé' });
    }
    
    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Non autorisé à supprimer ce commentaire' });
    }
    
    // Supprimer aussi les réponses
    await Comment.deleteMany({ parentComment: req.params.id });
    await Comment.findByIdAndDelete(req.params.id);
    
    res.status(200).json({ message: 'Commentaire supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du commentaire', error: error.message });
  }
};