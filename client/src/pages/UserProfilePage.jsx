import PostList from '../components/PostList';
import { useAuthStore } from '../store/authStore';

const UserProfilePage = () => {
  const user = useAuthStore((state) => state.user);
  
  console.log('UserProfilePage - user:', user);
  
  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-gray-600">Chargement du profil...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gray-100 p-6 rounded-lg mb-8">
        <h1 className="text-4xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-3xl font-bold">0</h2>
            <p className="text-gray-600">Total Post reactions</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-3xl font-bold">0</h2>
            <p className="text-gray-600">Total Post comments</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-3xl font-bold">500</h2>
            <p className="text-gray-600">Total Post views</p>
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