import PostList from '../components/PostList';

const HomePage = () => {

  return (
    
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Articles récents</h1>
      <PostList />
    </div>
  );
};

export default HomePage;
