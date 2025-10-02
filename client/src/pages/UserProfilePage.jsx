import PostList from '../components/PostList';
import { useAuthStore } from '../store/authStore';

const UserProfilePage = () => {
  const user = useAuthStore((state) => state.user);
  const [userArticles, setUserArticles] = useState([]);
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalLikes: 0,
    totalComments: 0,
    totalViews: 0
  });
  
  useEffect(() => {
    if (user?.userId) {
      fetchUserData();
    }
  }, [user]);
  
  const fetchUserData = async () => {
    try {
      // Simuler la récupération des articles de l'utilisateur
      const response = await fetch(`/api/articles?author=${user.userId}`);
      if (response.ok) {
        const articles = await response.json();
        setUserArticles(articles);
        
        // Calculer les statistiques
        const totalLikes = articles.reduce((sum, article) => sum + (article.likesCount || 0), 0);
        const totalComments = articles.reduce((sum, article) => sum + (article.commentsCount || 0), 0);
        
        setStats({
          totalPosts: articles.length,
          totalLikes,
          totalComments,
          totalViews: articles.length * 50 // Simulation
        });
      }
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
              <span>0</span>
            </div>
            <div className="bg-gray-100 p-4 rounded-md flex justify-between">
              <span>Followers</span>
              <span>0</span>
            </div>
            <div className="bg-gray-100 p-4 rounded-md flex justify-between">
              <span>Following</span>
              <span>0</span>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-3">
          <div className="border-b-2 pb-4 mb-6">
            <h2 className="text-2xl font-bold">Posts</h2>
          </div>
          <PostList />
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;