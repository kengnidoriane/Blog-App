import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { fetchArticles } from '../services/PostService';
import ArticleCard from '../components/ArticleCard';
import { useSEO } from '../hooks/useSEO';
import { TrendingUp, Clock, Users, BookOpen } from 'lucide-react';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('recent');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuthStore();
  
  useEffect(() => {
    loadArticles();
  }, []);
  
  const loadArticles = async () => {
    try {
      const data = await fetchArticles();
      setArticles(data.articles || []);
    } catch (error) {
      console.error('Erreur chargement articles:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useSEO({
    title: 'Home',
    description: 'Discover amazing articles, share your knowledge and connect with a community of developers on DevBlog.',
    keywords: 'development blog, programming articles, developer community, knowledge sharing',
    url: window.location.href
  });

  const tabs = [
    { id: 'recent', label: 'Recent', icon: Clock },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'following', label: 'Following', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-20">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Share your ideas with the world
            </h1>
            <p className="text-xl sm:text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
              Discover amazing articles, share your knowledge and connect with a community of developers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to={isAuthenticated ? "/create-post" : "/login"}
                className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors text-center"
              >
                {isAuthenticated ? "Start writing" : "Login to write"}
              </Link>
              <button 
                onClick={() => document.getElementById('articles').scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-green-600 transition-colors"
              >
                Explore articles
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-green-600">1.2k+</div>
              <div className="text-gray-600">Published articles</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">500+</div>
              <div className="text-gray-600">Active authors</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">10k+</div>
              <div className="text-gray-600">Monthly readers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">25k+</div>
              <div className="text-gray-600">Comments</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-green-600" />
                Popular categories
              </h3>
              <div className="space-y-2">
                {['Technology', 'Development', 'Design', 'Business', 'Lifestyle'].map((category) => (
                  <button
                    key={category}
                    className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-md transition-colors"
                  >
                    #{category}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Recommended authors</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-700 font-semibold text-sm">A{i}</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">Author {i}</div>
                      <div className="text-xs text-gray-500">{10 + i} articles</div>
                    </div>
                    <button className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full hover:bg-green-200 transition-colors">
                      Follow
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Articles */}
          <div className="lg:col-span-3" id="articles">
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm border mb-6">
              <div className="flex border-b">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center px-6 py-4 font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'text-green-600 border-b-2 border-green-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Articles List */}
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                <p className="text-gray-500 mt-2">Chargement des articles...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {articles.length > 0 ? (
                  articles.map((article) => (
                    <ArticleCard key={article._id} article={article} />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <div className="bg-white rounded-lg border border-gray-200 p-8">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No articles available</h3>
                      <p className="text-gray-500 mb-4">Be the first to publish an article!</p>
                      {isAuthenticated && (
                        <Link 
                          to="/create-post"
                          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                        >
                          Create article
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
