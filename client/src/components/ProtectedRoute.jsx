import { Navigate } from 'react-router-dom';
import  {useAuth } from '../hooks/useAuth';

export const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();
  
  // Vérifiez si l'utilisateur est connecté
  if (!user) {
    return <Navigate to='/login' />;
  }

  // Si l'utilisateur est connecté, retournez l'élément
  return element;
};
