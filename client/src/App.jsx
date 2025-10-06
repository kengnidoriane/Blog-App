import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { ProtectedRoute } from './components/common/ProtectedRoute'
import Navbar from './components/Navbar';
import { useSocket } from './hooks/useSocket';
import './App.css'

// Lazy loading des pages
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupForm = lazy(() => import('./pages/SingUpPage'));
const UserProfilePage = lazy(() => import('./pages/UserProfilePage'));
const CreatePostPage = lazy(() => import('./pages/CreatePostPage'));
const SinglePostPage = lazy(() => import('./pages/SinglePostPage'));
const EditPostPage = lazy(() => import('./pages/EditPostPage'));

const AppContent = () => {
  const location = useLocation();
  const hideNavbar = ['/login', '/signup'].includes(location.pathname);
  
  // Initialiser WebSocket
  useSocket();

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-post" element={<CreatePostPage />} />
          <Route path="/post/:postId" element={<SinglePostPage />} />
          <Route path="/edit-post/:postId" element={<EditPostPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/dashboard" element={<ProtectedRoute><UserProfilePage /></ProtectedRoute>} />
        </Routes>
      </Suspense>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
