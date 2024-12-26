import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important pour les cookies
});

// Intercepteur pour les requêtes
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour les réponses avec gestion du refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si l'erreur est 401 et qu'on n'a pas déjà essayé de refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get('refreshToken');
        const response = await api.post('/auth/refresh-token', { refreshToken });
        
        if (response.data.accessToken) {
          Cookies.set('accessToken', response.data.accessToken, { 
            expires: 1, // 1 jour
            secure: true,
            sameSite: 'strict'
          });
          
          // Réessayer la requête originale avec le nouveau token
          originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // En cas d'échec du refresh, déconnexion
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const setAuthTokens = (accessToken, refreshToken) => {
  Cookies.set('accessToken', accessToken, { 
    expires: 1, // 1 jour
    secure: true,
    sameSite: 'strict'
  });
  Cookies.set('refreshToken', refreshToken, { 
    expires: 7, // 7 jours
    secure: true,
    sameSite: 'strict'
  });
};

export const clearAuthTokens = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
};

export default api;
// import axios from 'axios';
// import Cookies from 'js-cookie';

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true,
// });

// api.interceptors.request.use(
//   (config) => {
//   const token = Cookies.get('token');

//   if (token) {
//     config.headers['Authorization'] = `Bearer ${token}`;
//   }
//   return config;

// }, (error)=> {
//   return Promise.reject(error);
// });

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response.status === 401 && !error.config._retry) {
//       error.config._retry = true;
//       try {
//         const refreshToken = Cookies.get('refreshToken');
//         const res = await api.post('/auth/refresh-token', { refreshToken});
//         if (res.data.token) {
//           Cookies.set('token', res.data.token, { expires: 1, secure: true, sameSite: 'Strict'});
//           api.defaults.headers['Authorization'] = `Bearer ${res.data.token}`;
//           return api(error.config);
//         }
//       } catch (refreshToken) {
//         Cookies.remove('token');
//         Cookies.remove('refreshToken');
//         window.location.href = '/login';
//         return Promise.reject(refreshToken);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export const setAuthTokens = (token, refreshToken) => {
//   Cookies.set('token', token, { expires: 1, secure: true, sameSite: 'strict' });
//   Cookies.set('refreshToken', refreshToken, { expires: 7, secure: true, samSite: 'strict' });
// };

// export const clearAuthTokens = () => {
//   Cookies.remove('token');
//   Cookies.remove('refreshToken')
// }

// export default api;