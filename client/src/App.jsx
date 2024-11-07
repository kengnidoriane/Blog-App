import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SingUpPage';
import UserProfilePage from './pages/UserProfilePage';
import CreatePostPage from './pages/CreatePostPage';
import SinglePostPage from './pages/SinglePostPage';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute'
import './App.css'

const App = () => {
  return (
    <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={ <HomePage />} />
            <Route path="/create-post" element={<ProtectedRoute element={<CreatePostPage />} />} />
            <Route path="/post/:postId" element={<SinglePostPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/user-profile" element={<ProtectedRoute element={<UserProfilePage />} />}  />
          </Routes>
        </Router>
    </AuthProvider>
  );
};

export default App;
