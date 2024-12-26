import { Navigate } from 'react-router-dom';
import  {useAuth } from '../../context/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  // Vérifiez si l'utilisateur est connecté
  if (!isAuthenticated ) {
    return <Navigate to='/login' replace/>;
  }

  // Si l'utilisateur est connecté, retournez l'élément
  return children;
};
