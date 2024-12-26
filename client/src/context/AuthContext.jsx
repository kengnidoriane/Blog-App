import { createContext, useReducer, useEffect, useContext } from 'react';
// import AuthService from '../services/AuthService';

export const AuthContext = createContext();

const authReducer = (state, action) => {

  switch(action.type) {
    case 'LOGIN':
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user))
      return { 
        ...state,
        user: action.payload,
        token: action.payload.token,
        isAuthenticated: true
      };
    case 'LOGOUT': 
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return { 
        ...state,
        user: null,
        token: null,
        isAuthenticated: false 
      };
    case 'UPDATE_USER':
      localStorage.setItem('user',JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    token: null,
    isAuthenticated: false,
  })

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if ( token && user ) {
      dispatch({
        type: 'LOGIN',
        payload: { token, user }
      });
    }
  }, []);



  // if (loading) {
  //   return <div>Chargement...</div>; // Ou votre composant de chargement
  // }

  return (
    <AuthContext.Provider value={{...state, dispatch}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
};