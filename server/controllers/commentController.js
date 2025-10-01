const Comment = require('../models/Comments');
const { protect } = require('../middlewares/auth');

// Créer un commentaire
exports.createComment = async (req, res) => {
  try {
    const { content, articleId } = req.body;
    const newComment = new Comment({
      content,
      author: req.user._id,
      articleId
    });

    const savedComment = await newComment.save();
    await savedComment.populate('author', 'name username');
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du commentaire', error: error.message });
  }
};

// Récupérer tous les commentaires pour un article donné
exports.getCommentsByArticle = async (req, res) => {
  try {
    const comments = await Comment.find({ articleId: req.params.articleId })
      .populate('author', 'name username')
      .sort({ createdAt: -1 });
    res.status(200).json(comments);
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
    
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Commentaire supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du commentaire', error: error.message });
  }
};