import apiArticle from "./apiArticle"


export const fetchArticles = async () => {
  try {
    const response = await apiArticle.get('/articles');
    return response.data;

  } catch (error) {
    console.error('Erreur lors de la recuperation des articles', error);
    throw error;
  }
};

export const createArticle = async (articleData) => {
  try {
    const response = await apiArticle.post('/articles', articleData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de l\'article', error);
    throw error;
  }
};

export const updateArticle = async (id, articleData) => {
  try {
    const response = await apiArticle.put(`/articles/${id}`, articleData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la modification de l\'article', error);
    throw error;
  }
};

export const deleteArticle = async (id) => {
  try {
    const response = await apiArticle.delete(`/articles/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'article', error);
    throw error;
  }
};

export const getArticleById = async (id) => {
  try {
    const response = await apiArticle.get(`/articles/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'article', error);
    throw error;
  }
};