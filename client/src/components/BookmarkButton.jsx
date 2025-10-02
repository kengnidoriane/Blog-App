import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const BookmarkButton = ({ articleId, className = "" }) => {
  const [bookmarked, setBookmarked] = useState(false);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    // Récupérer l'état du bookmark depuis localStorage
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    setBookmarked(bookmarks.includes(articleId));
  }, [articleId]);

  const handleBookmark = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    
    if (bookmarked) {
      // Retirer le bookmark
      const newBookmarks = bookmarks.filter(id => id !== articleId);
      localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
      setBookmarked(false);
    } else {
      // Ajouter le bookmark
      const newBookmarks = [...bookmarks, articleId];
      localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
      setBookmarked(true);
    }
  };

  return (
    <button 
      onClick={handleBookmark}
      className={`flex items-center gap-1 transition-colors ${
        bookmarked 
          ? 'text-green-600 hover:text-green-700' 
          : 'text-gray-500 hover:text-green-600'
      } ${className}`}
    >
      <svg 
        className={`w-4 h-4 ${bookmarked ? 'fill-current' : 'fill-none'}`} 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" 
        />
      </svg>
    </button>
  );
};

export default BookmarkButton;