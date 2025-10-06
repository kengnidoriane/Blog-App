import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Bookmark, MoreHorizontal } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useToast } from '../hooks/useToast';
import ToastContainer from './ToastContainer';
import apiArticle from '../services/apiArticle';

const ArticleCard = ({ article }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(article.likesCount || 0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { user, isAuthenticated } = useAuthStore();
  const { toasts, removeToast, success, error, warning } = useToast();
  
  useEffect(() => {
    if (isAuthenticated && article._id) {
      checkLikeStatus();
    }
  }, [isAuthenticated, article._id]);
  
  const checkLikeStatus = async () => {
    try {
      const response = await apiArticle.get(`/articles/${article._id}/like`);
      setIsLiked(response.data.liked);
      setLikesCount(response.data.likesCount);
    } catch (err) {
      // Silencieux si pas connecté
    }
  };

  const formatDate = (date) => {
    const now = new Date();
    const articleDate = new Date(date);
    const diffTime = Math.abs(now - articleDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'il y a 1 jour';
    if (diffDays < 7) return `il y a ${diffDays} jours`;
    return articleDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  };

  const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content?.split(' ').length || 0;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min de lecture`;
  };

  const handleLike = async () => {
    if (!isAuthenticated) {
      warning('Connectez-vous pour liker cet article');
      return;
    }
    
    if (isLoading) return;
    
    setIsLoading(true);
    
    try {
      const response = await apiArticle.post(`/articles/${article._id}/like`);
      setIsLiked(response.data.liked);
      setLikesCount(response.data.likesCount);
      
      if (response.data.liked) {
        success('Article ajouté à vos favoris !');
      }
    } catch (err) {
      if (err.response?.status === 403) {
        error('Vous ne pouvez pas liker votre propre article');
      } else {
        error('Erreur lors du like');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <article className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Image de couverture */}
      {article.image && (
        <div className="aspect-[2/1] overflow-hidden">
          <Link to={`/post/${article._id}`}>
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </Link>
        </div>
      )}
      
      <div className="p-4">
        {/* Header avec auteur */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {article.author?.name?.[0] || article.author?.username?.[0] || 'A'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium text-gray-900 truncate">
                {article.author?.name || article.author?.username || 'Auteur'}
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500 text-xs">
                {formatDate(article.createDate)}
              </span>
            </div>
          </div>
          <button className="p-1 hover:bg-gray-100 rounded-full">
            <MoreHorizontal className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Contenu principal */}
        <div className={`${article.image ? '' : 'ml-10'}`}>
          <Link to={`/post/${article._id}`} className="block group">
            <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors line-clamp-2 leading-tight">
              {article.title}
            </h2>
            
            {article.content && (
              <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
                {article.content}
              </p>
            )}
          </Link>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {article.tags.slice(0, 4).map((tag, index) => (
                <span 
                  key={index} 
                  className="px-2 py-1 bg-gray-100 hover:bg-green-50 text-gray-700 hover:text-green-700 text-xs rounded cursor-pointer transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Footer avec actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Likes */}
              <button 
                onClick={handleLike}
                disabled={isLoading}
                className={`flex items-center gap-1 px-2 py-1 rounded-md transition-colors disabled:opacity-50 ${
                  isLiked 
                    ? 'text-red-600 bg-red-50 hover:bg-red-100' 
                    : 'text-gray-500 hover:text-red-600 hover:bg-red-50'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                <span className="text-xs font-medium">{likesCount}</span>
              </button>

              {/* Comments */}
              <Link 
                to={`/post/${article._id}#comments`}
                className="flex items-center gap-1 px-2 py-1 rounded-md text-gray-500 hover:text-green-600 hover:bg-green-50 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-xs font-medium">{article.commentsCount || 0}</span>
              </Link>
            </div>

            <div className="flex items-center gap-2">
              {/* Temps de lecture */}
              <span className="text-xs text-gray-500">
                {getReadingTime(article.content)}
              </span>
              
              {/* Bookmark */}
              <button 
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-1 rounded-md transition-colors ${
                  isBookmarked 
                    ? 'text-green-600 bg-green-50' 
                    : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
    </>
  );
};

export default ArticleCard;