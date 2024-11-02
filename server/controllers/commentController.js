
const Comment = require('../models/Comments');

// creer un commentaire
exports.createComment = async (req, res) => {
  try {
    const { content, author, articleId } = req.body;
    const newComment = new Comment ({ content, author, articleId });

   savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ meaasge: 'Erreur lors de la creation du commentaire'})
  }
}

// recuperer tous les commentaires pour un un article donne
exports.getCommentsByArticle = async (req, res) => {
  try {
    const comments = await Comment.find({ articleId: req.params.articleId})
    res(200).json(comments)
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la recuperation des commentaires'})
  }
};


exports.deleteComment = async (req, res) => {
  const id = req.params.id;
  try {
    const comment = await Comment.findById(id);
    if (comment) {
      await comment.remove();
      res,status(200).json({ meaasge: 'Commentaire supprime avec success'})
    } else {
      res.status(404).json({ message: 'commentaire non trouve'})
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du commentaire'})
  }
};