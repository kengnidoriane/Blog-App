import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { Container, Typography, Button } from '@mui/material';
import axios from 'axios'
import CommentSection from '../components/CommentSection';

const SinglePostPage = () => {

  const { postId } = useParams();
  const apiURL = import.meta.env.VITE_API_URL;
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiURL}/articles/${postId}`);
        setArticle(response.data);
        console.log(response.data);
        
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false)
      }

    }
    fetchData();
  }, [postId]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error.message}</div>;
  if (!article) return <div>Aucun article trouvé.</div>; // Vérification si article est null
  const comments = ["Super article !", "Très intéressant."];

  return (
    <Container>
      <Typography variant="h3" gutterBottom>{article.title}</Typography>
      <Typography variant="body1" paragraph dangerouslySetInnerHTML={{ __html: article.content }}/>
      <Button variant="outlined" color="primary">Modifier</Button>
      <Button variant="outlined" color="secondary">Supprimer</Button>
      <CommentSection comments={comments} onAddComment={(comment) => console.log(comment)} />
    </Container>
  );
};

export default SinglePostPage;
