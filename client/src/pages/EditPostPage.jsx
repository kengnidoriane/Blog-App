import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../store/authStore';
import TagInput from '../components/TagInput';
import { updateArticle, getArticleById } from '../services/PostService.js';
import AuthPrompt from '../components/AuthPrompt';

const EditPostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const { register, handleSubmit, setValue, watch, formState: { isSubmitting } } = useForm();
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const articleData = await getArticleById(postId);
        setArticle(articleData);
        
        // Vérifier si l'utilisateur est l'auteur
        const isAuthor = user?.userId === articleData.author?._id || user?.userId === articleData.author;
        if (!isAuthor) {
          setError('Vous n\'êtes pas autorisé à modifier cet article');
          return;
        }
        
        // Pré-remplir le formulaire
        setValue('title', articleData.title);
        setValue('content', articleData.content);
        setValue('category', articleData.category);
        setTags(articleData.tags || []);
      } catch (err) {
        setError('Erreur lors du chargement de l\'article');
      } finally {
        setLoading(false);
      }
    };

    if (user && postId) {
      fetchArticle();
    }
  }, [postId, user, setValue]);

  const onSubmit = async (data) => {
    try {
      await updateArticle(postId, {
        title: data.title,
        content: data.content,
        category: data.category,
        tags: tags
      });
      navigate(`/post/${postId}`);
    } catch (error) {
      console.error('Erreur lors de la modification:', error);
      alert('Erreur lors de la modification de l\'article');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full">
          <AuthPrompt action="modifier cet article" />
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-gray-600">Chargement...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-2">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Modifier l'article</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <input 
              {...register('title', { required: 'Le titre est requis' })}
              className="w-full text-4xl font-medium text-gray-700 outline-none border-b border-gray-200 pb-2" 
              placeholder="Titre de l'article..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Catégorie
            </label>
            <select 
              {...register('category')}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="technologie">Technologie</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="business">Business</option>
              <option value="sante">Santé</option>
              <option value="education">Education</option>
              <option value="divertissement">Divertissement</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <TagInput tags={tags} setTags={setTags} />
          </div>
          
          <div>
            <textarea
              {...register('content', { required: 'Le contenu est requis' })}
              placeholder="Contenu de l'article (format Markdown)"
              className="w-full h-96 p-4 border border-gray-300 rounded-md font-mono focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />
          </div>

          <div className="flex gap-4">
            <button 
              type="submit"
              disabled={isSubmitting}
              className="bg-green-700 hover:bg-green-800 disabled:opacity-50 text-white px-6 py-2 rounded-md font-medium"
            >
              {isSubmitting ? 'Modification...' : 'Modifier'}
            </button>
            <button 
              type="button"
              onClick={() => navigate(`/post/${postId}`)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md font-medium"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostPage;