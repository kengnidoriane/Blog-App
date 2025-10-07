import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useToast } from '../hooks/useToast';
import { UserPlus, UserCheck } from 'lucide-react';
import CommentSection from '../components/CommentSection';
import ToastContainer from '../components/ToastContainer';
import apiArticle from '../services/apiArticle.js';

const SinglePostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const { toasts, removeToast, success, error: showError } = useToast();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiArticle.get(`/articles/${postId}`);
        setArticle(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [postId]);

  const handleEdit = () => {
    navigate(`/edit-post/${postId}`);
  };

  const handleDelete = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      try {
        await apiArticle.delete(`/articles/${postId}`);
        success('Article supprimé avec succès');
        setTimeout(() => navigate('/'), 1500);
      } catch (err) {
        showError('Erreur lors de la suppression');
      }
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-lg text-gray-600">Chargement...</div>
    </div>
  );
  
  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-lg text-red-600">Erreur: {error.message}</div>
    </div>
  );
  
  if (!article) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-lg text-gray-600">Aucun article trouvé.</div>
    </div>
  );

  const isAuthor = user?.userId === article.author?._id || user?.userId === article.author;
  
  const handleFollow = async () => {
    if (!user) {
      showError('Connectez-vous pour suivre cet auteur');
      return;
    }
    
    if (isAuthor) {
      showError('Vous ne pouvez pas vous suivre vous-même');
      return;
    }
    
    setFollowLoading(true);
    try {
      // Simulation API follow (à implémenter)
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsFollowing(!isFollowing);
      success(isFollowing ? 'Vous ne suivez plus cet auteur' : 'Vous suivez maintenant cet auteur');
    } catch (err) {
      showError('Erreur lors du suivi');
    } finally {
      setFollowLoading(false);
    }
  };

  return (
    <>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <div className="max-w-4xl mx-auto px-4 py-8">
      <article className="bg-white rounded-xl shadow-lg overflow-hidden">
        {article.image && (
          <div className="h-64 md:h-80 bg-gradient-to-r from-green-400 to-green-600">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          </div>
        )}
        
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-700 font-bold text-lg">
                  {article.author?.name?.[0] || 'A'}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  {article.author?.name || 'Auteur inconnu'}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(article.createDate).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
            
            {/* Bouton Follow */}
            {!isAuthor && user && (
              <button
                onClick={handleFollow}
                disabled={followLoading}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors disabled:opacity-50 ${
                  isFollowing
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {followLoading ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : isFollowing ? (
                  <UserCheck className="w-4 h-4" />
                ) : (
                  <UserPlus className="w-4 h-4" />
                )}
                <span className="text-sm">
                  {isFollowing ? 'Suivi' : 'Suivre'}
                </span>
              </button>
            )}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {article.title}
          </h1>
          
          <div className="prose prose-lg prose-green max-w-none mb-8 leading-relaxed
                         prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-7
                         prose-strong:text-gray-900 prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded
                         prose-pre:bg-gray-900 prose-pre:text-gray-100
                         prose-blockquote:border-l-green-500 prose-blockquote:bg-green-50 prose-blockquote:py-2 prose-blockquote:px-4
                         prose-a:text-green-600 hover:prose-a:text-green-700
                         prose-ul:list-disc prose-ol:list-decimal
                         prose-li:marker:text-green-600" 
               dangerouslySetInnerHTML={{ __html: article.content }} />
          
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {article.tags.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          {isAuthor && (
            <div className="flex gap-4 mb-8 pt-6 border-t border-gray-200">
              <button
                onClick={handleEdit}
                className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Modifier
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Supprimer
              </button>
            </div>
          )}
        </div>
      </article>
      
      <div className="mt-8">
        <CommentSection articleId={postId} />
      </div>
    </div>
    </>
  );
};

export default SinglePostPage;
