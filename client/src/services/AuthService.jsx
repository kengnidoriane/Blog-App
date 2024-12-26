import api from './api';
import Cookies from 'js-cookie';

const AuthService = {
  async signUp(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      if (response.data.accessToken && response.data.refreshToken) {
        // Stockage des tokens dans les cookies
        Cookies.set('accessToken', response.data.accessToken, {
          expires: 1, // 1 jour
          secure: true,
          sameSite: 'strict'
        });
        Cookies.set('refreshToken', response.data.refreshToken, {
          expires: 7, // 7 jours
          secure: true,
          sameSite: 'strict'
        });
      }
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Erreur lors de l\'inscription');
      }
      throw new Error('Erreur de connexion au serveur');
    }
  },

  async login(email, password) {
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data.accessToken && response.data.refreshToken) {
        Cookies.set('accessToken', response.data.accessToken, {
          expires: 1,
          secure: true,
          sameSite: 'strict'
        });
        Cookies.set('refreshToken', response.data.refreshToken, {
          expires: 7,
          secure: true,
          sameSite: 'strict'
        });
      }
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Erreur lors de la connexion');
      }
      throw new Error('Erreur de connexion au serveur');
    }
  },

  logout() {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
  },

  async getCurrentUser() {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAccessToken() {
    return Cookies.get('accessToken');
  },

  getRefreshToken() {
    return Cookies.get('refreshToken');
  }
};

export default AuthService;

// import api, { setAuthTokens, clearAuthTokens } from './api';

// const AuthService = {
//   async signUp(userData) {
//     try {
//       const response = await api.post('/auth/register', userData);
//       if (response.data.accessToken && response.data.refreshToken) {
//         setAuthTokens(response.data.accessToken, response.data.refreshToken);
//       }
//       console.log(response.data);

//       return response.data;
      
//     } catch (error) {
//       throw this.handleError(error);
//     }
//   },

//   async login(email, password) {
//     try {
//       const response = await api.post('/auth/login', { email, password });
//       if (response.data.accessToken && response.data.refreshToken) {
//         setAuthTokens(response.data.accessToken, response.data.refreshToken);
//       }
//       return response.data;
//     } catch (error) {
//       throw this.handleError(error);
//     }
//   },

//   async logout() {
//     try {
//       await api.post('/auth/logout');
//       clearAuthTokens();
//     } catch (error) {
//       console.error('Erreur lors de la déconnexion:', error);
//       clearAuthTokens(); // On nettoie quand même les tokens
//     }
//   },

//   async getCurrentUser() {
//     try {
//       const response = await api.get('/user/profile');
//       return response.data;
//     } catch (error) {
//       throw this.handleError(error);
//     }
//   },

//   handleError(error) {
//     if (error.response) {
//       // Erreur de réponse du serveur
//       return new Error(error.response.data.message || 'Une erreur est survenue');
//     }
//     if (error.request) {
//       // Pas de réponse du serveur
//       return new Error('Impossible de contacter le serveur');
//     }
//     // Erreur lors de la configuration de la requête
//     return new Error('Erreur de configuration de la requête');
//   }
// };

// export default AuthService;
// // src/services/authService.js
// import api, { setAuthTokens, clearAuthTokens } from './api';

// export const AuthService = {
//   async signUp(userData) {
//     const response = await api.post('/auth/register', userData);
//     if (response.data.token && response.data.refreshToken) {
//       setAuthTokens(response.data.token, response.data.refreshToken);
//     }
//     return response.data;
//   },

//   async login(credentials) {
//     const response = await api.post('/auth/login', credentials);
//     if (response.data.token && response.data.refreshToken) {
//       setAuthTokens(response.data.token, response.data.refreshToken);
//     }
//     return response.data;
//   },

//   logout() {
//     clearAuthTokens();
//     return api.post('/auth/logout');
//   },

//   async getCurrentUser() {
//     const response = await api.get('user/profile');
//     return response.data;
//   },

// };

