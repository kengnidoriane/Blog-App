import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const CommentSection = ({ articleId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const handleAddComment = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (!newComment.trim()) return;
    
    setLoading(true);
    try {
      // Simulation d'ajout de commentaire
      const comment = {
        id: Date.now(),
        content: newComment,
        author: user.name || user.username,
        createdAt: new Date().toISOString()
      };
      setComments([...comments, comment]);
      setNewComment('');
    } catch (error) {
      console.error('Erreur lors de l\'ajout du commentaire:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Commentaires ({comments.length})</h3>
      
      <div className="space-y-4 mb-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-100 pb-4 last:border-b-0">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-700 font-semibold text-sm">
                    {comment.author?.[0] || 'U'}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900">{comment.author}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-8">Aucun commentaire pour le moment. Soyez le premier à commenter !</p>
        )}
      </div>
      
      <div className="border-t border-gray-200 pt-6">
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
              onClick={handleAddComment}
              disabled={loading || !newComment.trim()}
              className="bg-green-700 hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              {loading ? 'Envoi...' : 'Publier le commentaire'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
