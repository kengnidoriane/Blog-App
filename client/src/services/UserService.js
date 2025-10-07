import apiArticle from './apiArticle.js';

export const followUser = async (userId) => {
  try {
    const response = await apiArticle.post(`/user/${userId}/follow`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors du follow:', error);
    throw error;
  }
};

export const unfollowUser = async (userId) => {
  try {
    const response = await apiArticle.post(`/user/${userId}/unfollow`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'unfollow:', error);
    throw error;
  }
};

export const getFollowers = async (userId) => {
  try {
    const response = await apiArticle.get(`/user/${userId}/followers`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des followers:', error);
    throw error;
  }
};

export const getFollowing = async (userId) => {
  try {
    const response = await apiArticle.get(`/user/${userId}/following`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des following:', error);
    throw error;
  }
};

export const getUserProfile = async (userId) => {
  try {
    const response = await apiArticle.get(`/user/profile`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    throw error;
  }
};