import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import AuthService from '../services/AuthService';

export const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signUp = async (name, username, email, password, imageUrl) => {
    setLoading(true);
    setError(null);
    try {
      const response = await AuthService.signUp({
        name,
        username,
        email,
        password,
        imageUrl
      });
      setUser(response.user);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await AuthService.login(email, password);
      setUser(response.user);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await AuthService.logout();
      setUser(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    signUp,
    login,
    logout
  };
};

export default useAuth;
// import { useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import AuthService from '../services/AuthService';

// export const useAuth = () => {
//   const { user, setUser } = useContext(AuthContext);

//   const login = async (email, password) => {
//     const response = await AuthService.login(email, password);
//     setUser(response.user);
//     return response;
//   };

//   const signUp = async (name, username, email, password) => {
//     const response = await AuthService.signup( name, username, email, password );
//     setUser(response.user);
//     return response;
//   };

//   const logout = () => {
//     AuthContext.logout();
//     setUser(null);
//   }

//   return { user, login, signUp, logout };
// };

// export default useAuth;