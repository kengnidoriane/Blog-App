import { useEffect, useState } from 'react';
import { fetchArticles } from '../services/PostService';
import ArticleCard from './ArticleCard';

const PostList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const data = await fetchArticles();
        // L'API retourne { articles: [...], totalPages, currentPage, total }
        const articlesArray = data.articles || data;
        setArticles(Array.isArray(articlesArray) ? articlesArray : []);
        console.log('Articles récupérés:', articlesArray);
        
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
    <div className="max-w-4xl mx-auto space-y-4">
      {articles && articles.length > 0 ? (
        articles.map((article) => (
          <ArticleCard key={article._id} article={article} />
        ))
      ) : (
        <div className="text-center py-12">
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun article disponible</h3>
            <p className="text-gray-500">Soyez le premier à publier un article !</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostList;
