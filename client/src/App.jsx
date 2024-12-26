import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupForm from './pages/SingUpPage';
import UserProfilePage from './pages/UserProfilePage';
import CreatePostPage from './pages/CreatePostPage';
import SinglePostPage from './pages/SinglePostPage';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute'
import './App.css'

const App = () => {
  return (
    
    <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={ <HomePage />} />
            <Route path="/create-post" element={<CreatePostPage />}  />
            <Route path="/post/:postId" element={<SinglePostPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/user-profile" element={<ProtectedRoute element={<UserProfilePage />} />}  />
          </Routes>
        </AuthProvider>
    </Router>
  );
};

export default App;
