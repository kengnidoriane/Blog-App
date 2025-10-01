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