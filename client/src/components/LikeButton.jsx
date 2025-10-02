import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import apiArticle from '../services/apiArticle';

const LikeButton = ({ articleId, initialLikes = 0, className = "" }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikes);
  const [loading, setLoading] = useState(false);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && articleId) {
      fetchLikeStatus();
    }
  }, [articleId, user]);

  const fetchLikeStatus = async () => {
    try {
      const response = await apiArticle.get(`/articles/${articleId}/like`);
      setLiked(response.data.liked);
      setLikesCount(response.data.likesCount);
    } catch (error) {
      console.error('Erreur lors de la récupération du statut de like:', error);
    }
  };

  const handleLike = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (loading) return;

    setLoading(true);
    try {
      const response = await apiArticle.post(`/articles/${articleId}/like`);
      setLiked(response.data.liked);
      setLikesCount(response.data.likesCount);
    } catch (error) {
      if (error.response?.status === 403) {
        alert('Vous ne pouvez pas liker votre propre article');
      } else {
        console.error('Erreur lors du like:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleLike}
      disabled={loading}
      className={`flex items-center gap-1 transition-colors ${
        liked 
          ? 'text-red-500 hover:text-red-600' 
          : 'text-gray-500 hover:text-red-500'
      } ${className}`}
    >
      <svg 
        className={`w-4 h-4 ${liked ? 'fill-current' : 'fill-none'}`} 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
        />
      </svg>
      <span className="text-xs">{likesCount}</span>
    </button>
  );
};

export default LikeButton;