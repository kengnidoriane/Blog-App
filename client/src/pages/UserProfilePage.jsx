import { useState, useEffect } from 'react';
import PostList from '../components/PostList';
import { useAuthStore } from '../store/authStore';
import { getUserProfile, getFollowers, getFollowing } from '../services/UserService';
import { fetchArticles } from '../services/PostService';

const UserProfilePage = () => {
  const { user, refreshUserProfile } = useAuthStore();
  const [userArticles, setUserArticles] = useState([]);
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalLikes: 0,
    totalComments: 0,
    totalViews: 0
  });
  
  useEffect(() => {
    if (user?.userId) {
      refreshUserProfile(); // Rafraîchir le profil d'abord
      fetchUserData();
    }
  }, [user?.userId]);
  
  const fetchUserData = async () => {
    try {
      // Récupérer tous les articles et filtrer par auteur
      const allArticles = await fetchArticles();
      const userArticles = allArticles.articles?.filter(article => 
        article.author?._id === user.userId || article.author === user.userId
      ) || [];
      
      setUserArticles(userArticles);
      
      // Calculer les statistiques
      const totalLikes = userArticles.reduce((sum, article) => sum + (article.likesCount || 0), 0);
      const totalComments = userArticles.reduce((sum, article) => sum + (article.commentsCount || 0), 0);
      
      // Utiliser les données du modèle User directement
      setStats({
        totalPosts: userArticles.length,
        totalLikes,
        totalComments,
        totalViews: totalLikes * 3 + totalComments * 2, // Calcul basé sur engagement
        followers: user.followers?.length || 0,
        following: user.following?.length || 0
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des données utilisateur:', error);
    }
  };
  
  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-gray-600">Chargement du profil...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profil utilisateur */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-green-700 font-bold text-2xl">
              {user.name?.[0] || user.username?.[0] || 'U'}
            </span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{user.name || user.username}</h1>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500">Membre depuis {new Date(user.createdAt || Date.now()).toLocaleDateString('fr-FR')}</p>
          </div>
        </div>
      </div>
      
      {/* Statistiques */}
      <div className="bg-gray-100 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-bold mb-6">Statistiques</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-3xl font-bold text-green-700">{stats.totalPosts}</h3>
            <p className="text-gray-600">Articles publiés</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-3xl font-bold text-red-500">{stats.totalLikes}</h3>
            <p className="text-gray-600">Total des likes</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-3xl font-bold text-blue-500">{stats.totalComments}</h3>
            <p className="text-gray-600">Total des commentaires</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-3xl font-bold text-purple-500">{stats.totalViews}</h3>
            <p className="text-gray-600">Total des vues</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded-md flex justify-between">
              <span>Posts</span>
              <span>{stats.totalPosts}</span>
            </div>
            <div className="bg-gray-100 p-4 rounded-md flex justify-between">
              <span>Followers</span>
              <span>{stats.followers || 0}</span>
            </div>
            <div className="bg-gray-100 p-4 rounded-md flex justify-between">
              <span>Following</span>
              <span>{stats.following || 0}</span>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-3">
          <div className="border-b-2 pb-4 mb-6">
            <h2 className="text-2xl font-bold">Mes Articles ({stats.totalPosts})</h2>
          </div>
          {userArticles.length > 0 ? (
            <div className="space-y-4">
              {userArticles.map((article) => (
                <div key={article._id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{article.title}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {article.content || 'Pas d\'aperçu disponible'}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{new Date(article.createDate).toLocaleDateString('fr-FR')}</span>
                        <span>•</span>
                        <span>{article.likesCount || 0} likes</span>
                        <span>•</span>
                        <span>{article.commentsCount || 0} commentaires</span>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button 
                        onClick={() => window.location.href = `/edit-post/${article._id}`}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors text-sm"
                      >
                        Modifier
                      </button>
                      <button 
                        onClick={() => window.location.href = `/post/${article._id}`}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors text-sm"
                      >
                        Voir
                      </button>
                    </div>
                  </div>
                  {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {article.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-white rounded-lg border border-gray-200 p-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun article publié</h3>
                <p className="text-gray-500 mb-4">Commencez à partager vos idées avec la communauté</p>
                <button 
                  onClick={() => window.location.href = '/create-post'}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  Créer mon premier article
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;