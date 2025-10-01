import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupForm from './pages/SingUpPage';
import UserProfilePage from './pages/UserProfilePage';
import CreatePostPage from './pages/CreatePostPage';
import SinglePostPage from './pages/SinglePostPage';
import { ProtectedRoute } from './components/common/ProtectedRoute'
import Navbar from './components/Navbar';
import './App.css'

const App = () => {
  return (
    
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={ <HomePage />} />
        <Route path="/create-post" element={<CreatePostPage />}  />
        <Route path="/post/:postId" element={<SinglePostPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<UserProfilePage />} />}  />
      </Routes>
    </Router>
  );
};

export default App;
