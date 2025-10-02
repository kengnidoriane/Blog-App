import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import CommentSection from '../components/CommentSection';
import apiArticle from '../services/apiArticle';

const SinglePostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        navigate('/');
      } catch (error) {
        alert('Erreur lors de la suppression');
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

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <article className="bg-white rounded-xl shadow-lg overflow-hidden">
        {article.image && (
          <div className="h-64 md:h-80 bg-gradient-to-r from-green-400 to-green-600">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          </div>
        )}
        
        <div className="p-8">
          <div className="flex items-center gap-4 mb-6">
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
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {article.title}
          </h1>
          
          <div className="prose prose-lg max-w-none mb-8" 
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
  );
};

export default SinglePostPage;
