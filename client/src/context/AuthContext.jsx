import { createContext, useState, useContext, useEffect } from 'react';
import AuthService from '../services/AuthService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setUser(user);
    }
    setLoading(false);
  }, []);

  const value = {
    user,
    setUser,
    loading
  };

  return (<AuthContext.Provider value={value}>{children}</AuthContext.Provider>);
};

// export const UseAuth = () => {
//   return useContext(AuthContext);
// }