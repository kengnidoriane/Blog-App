import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo1.png';
import { useAuthStore } from '../store/authStore';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-white shadow-md w-full">
      <div className="flex justify-between items-center px-4 py-2">
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="Logo" className="w-16 h-10 rounded" />
        </Link>

        <div className="hidden md:flex flex-1 max-w-2xl mx-4">
          <div className="flex w-full border border-gray-300 rounded-lg px-3 py-2">
            <svg className="w-5 h-5 text-gray-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full outline-none"
            />
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link
                to="/create-post"
                className="px-4 py-2 border border-green-700 text-green-700 rounded hover:bg-green-50"
              >
                Create Post
              </Link>
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="w-10 h-10 rounded-full bg-green-700 text-white flex items-center justify-center"
                >
                  {user?.name?.[0] || 'U'}
                </button>
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-green-700 hover:text-green-800">
                Log in
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 border border-green-700 text-green-700 rounded hover:bg-green-50"
              >
                Create Account
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-green-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;