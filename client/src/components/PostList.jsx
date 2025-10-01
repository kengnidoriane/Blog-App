import { useEffect, useState } from 'react';
import { fetchArticles } from '../services/PostService';
import { Link } from 'react-router-dom';

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {articles && articles.length > 0 ? articles.map((post) => (
        <div key={post._id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
          {post.image && (
            <div className="h-48 bg-gradient-to-r from-green-400 to-green-600">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-700 font-semibold">
                  {post.author?.name?.[0] || post.author?.username?.[0] || 'A'}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {post.author?.name || post.author?.username || 'Auteur inconnu'}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(post.createDate).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
              {post.title}
            </h3>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {post.content.substring(0, 150)}...
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {post.tags?.slice(0, 2).map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              
              <Link 
                to={`/post/${post._id}`}
                className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                Lire plus
              </Link>
            </div>
          </div>
        </div>
      )) : (
        <div className="col-span-full text-center py-12">
          <p className="text-gray-500 text-lg">Aucun article disponible</p>
        </div>
      )}
    </div>
  );
};

export default PostList;
