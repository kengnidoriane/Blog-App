import { useEffect, useState } from 'react';
import { fetchArticles } from '../services/PostService';
import { Link } from 'react-router-dom';
import LikeButton from './LikeButton';
import BookmarkButton from './BookmarkButton';

const PostList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const data = await fetchArticles();
        setArticles(Array.isArray(data) ? data : []);
        console.log(data);
        
      } catch (err) {
        setError(err)
        
      } finally {
        setLoading(false)
      }
    };
    getArticles();
  },[]);

  if (loading) {
    return <div>Chargement</div>
  };

  if (error) {
    return <div>Erreur: {error.message}</div>
  }

  return (
    <div className="max-w-4xl mx-auto">
      {articles && articles.length > 0 ? articles.map((post) => (
        <article key={post._id} className="bg-white rounded-lg border border-gray-200 hover:border-green-300 transition-all duration-200 mb-4 overflow-hidden hover:shadow-md">
          <div className="p-6">
            {/* Header avec auteur */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-700 font-semibold text-sm">
                  {post.author?.name?.[0] || post.author?.username?.[0] || 'A'}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900">
                    {post.author?.name || post.author?.username || 'Auteur inconnu'}
                  </span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-500">
                    {new Date(post.createDate).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'short'
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Contenu principal */}
            <div className="flex gap-6">
              <div className="flex-1">
                <Link to={`/post/${post._id}`} className="block group">
                  <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {post.content.replace(/<[^>]*>/g, '').substring(0, 120)}...
                  </p>
                </Link>

                {/* Tags et interactions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Tags */}
                    <div className="flex gap-2">
                      {post.tags?.slice(0, 3).map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 hover:bg-green-100 text-gray-700 hover:text-green-700 text-xs rounded cursor-pointer transition-colors">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center gap-4 text-gray-500">
                    <LikeButton 
                      articleId={post._id} 
                      initialLikes={post.likesCount || 0}
                    />
                    
                    <Link 
                      to={`/post/${post._id}#comments`}
                      className="flex items-center gap-1 hover:text-green-600 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span className="text-xs">{post.commentsCount || 0}</span>
                    </Link>
                    
                    <BookmarkButton articleId={post._id} />
                  </div>
                </div>
              </div>
              
              {/* Image à droite */}
              {post.image && (
                <div className="w-24 h-24 flex-shrink-0">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>
        </article>
      )) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Aucun article disponible</p>
        </div>
      )}
    </div>
  );
};

export default PostList;
