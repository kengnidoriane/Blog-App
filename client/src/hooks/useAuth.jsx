import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import AuthService from '../services/AuthService';

export const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const login = async (email, password) => {
    const response = await AuthService.login(email, password);
    setUser(response.user);
    return response;
  };

  const signUp = async (name, username, email, password) => {
    const response = await AuthService.signup( name, username, email, password );
    setUser(response.user);
    return response;
  };

  const logout = () => {
    AuthContext.logout();
    setUser(null);
  }

  return { user, login, signUp, logout };
};

export default useAuth;