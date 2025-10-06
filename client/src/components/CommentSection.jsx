import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import apiArticle from '../services/apiArticle';
import AuthPrompt from './AuthPrompt';

const CommentItem = ({ comment, onReply, onLike, user, level = 0 }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(comment.likesCount || 0);

  const handleReply = async () => {
    if (!replyContent.trim()) return;
    await onReply(comment._id, replyContent);
    setReplyContent('');
    setShowReplyForm(false);
  };

  const handleLike = async () => {
    try {
      const response = await apiArticle.post(`/articles/${comment.articleId}/comments/${comment._id}/like`);
      setLiked(response.data.liked);
      setLikesCount(response.data.likesCount);
    } catch (error) {
      console.error('Erreur lors du like:', error);
    }
  };

  return (
    <div className={`${level > 0 ? 'ml-8 border-l-2 border-gray-100 pl-4' : ''}`}>
      <div className="flex items-start gap-3 mb-4">
        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-green-700 font-semibold text-sm">
            {comment.author?.name?.[0] || 'U'}
          </span>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-gray-900">{comment.author?.name}</span>
            <span className="text-xs text-gray-500">
              {new Date(comment.createdAt).toLocaleDateString('fr-FR')}
            </span>
          </div>
          <p className="text-gray-700 mb-2">{comment.content}</p>
          
          <div className="flex items-center gap-4 text-sm">
            <button 
              onClick={handleLike}
              className={`flex items-center gap-1 ${liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'} transition-colors`}
            >
              <svg className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {likesCount}
            </button>
            
            {level < 2 && (
              <button 
                onClick={() => setShowReplyForm(!showReplyForm)}
                className="text-gray-500 hover:text-green-600 transition-colors"
              >
                Répondre
              </button>
            )}
          </div>
          
          {showReplyForm && (
            <div className="mt-3 space-y-2">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Votre réponse..."
                rows={2}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleReply}
                  className="bg-green-700 text-white px-3 py-1 rounded text-sm hover:bg-green-800"
                >
                  Répondre
                </button>
                <button
                  onClick={() => setShowReplyForm(false)}
                  className="text-gray-500 px-3 py-1 text-sm hover:text-gray-700"
                >
                  Annuler
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {comment.replies && comment.replies.map((reply) => (
        <CommentItem 
          key={reply._id} 
          comment={reply} 
          onReply={onReply} 
          onLike={onLike} 
          user={user} 
          level={level + 1}
        />
      ))}
    </div>
  );
};

const CommentSection = ({ articleId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    fetchComments();
  }, [articleId]);

  const fetchComments = async () => {
    try {
      const response = await apiArticle.get(`/articles/${articleId}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des commentaires:', error);
    }
  };

  const handleAddComment = async (parentId = null, content = null) => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    const commentContent = content || newComment;
    if (!commentContent.trim()) return;
    
    setLoading(true);
    try {
      await apiArticle.post(`/articles/${articleId}/comments`, {
        content: commentContent,
        articleId,
        parentComment: parentId
      });
      
      if (!parentId) {
        setNewComment('');
      }
      
      await fetchComments();
    } catch (error) {
      console.error('Erreur lors de l\'ajout du commentaire:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Commentaires ({comments.length})</h3>
      
      <div className="space-y-6 mb-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem 
              key={comment._id} 
              comment={comment} 
              onReply={handleAddComment} 
              user={user}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center py-8">Aucun commentaire pour le moment. Soyez le premier à commenter !</p>
        )}
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        {user ? (
          <>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Ajouter un commentaire</h4>
            <div className="space-y-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Partagez votre avis..."
                rows={4}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              />
              <div className="flex justify-end">
                <button
                  onClick={() => handleAddComment()}
                  disabled={loading || !newComment.trim()}
                  className="bg-green-700 hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  {loading ? 'Envoi...' : 'Publier le commentaire'}
                </button>
              </div>
            </div>
          </>
        ) : (
          <AuthPrompt action="commenter cet article" />
        )}
      </div>
    </div>
  );
};

export default CommentSection;
