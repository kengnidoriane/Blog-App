import { useEffect, useState } from 'react';
import { fetchArticles } from '../services/PostService';
import { Grid, Card, CardContent, Typography, CardActions, Button, Box } from '@mui/material';
// import PostItem from './PostItem';

const PostList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const data = await fetchArticles();
        setArticles(data);
        console.log(data);
        
      } catch (err) {
        setError(err)
        
      } finally {
        setLoading(false)
      }
    };
    getArticles();
  },[]);

  if (loading) {
    return <div>Chargement</div>
  };

  if (error) {
    return <div>Erreur: {error.message}</div>
  }

  return (
    <Grid container spacing={4} className='p-4' >
      {articles.map((post) => (
        <Grid item key={post._id} xs={12} sm={6} md={4} className='m-2'>
            <Card>
              <CardContent className=' bg-slate-500'>
                <Box className='flex flex-row gap-3 m-2'>
                  <div className=' bg-blue-50 rounded max-h-8'>
                    {
                      (post.image) ? <img src={post.image}/> : <span>M</span>
                    }
                  </div>
                  <div className='flex flex-col'>
                    <span>{post.author}</span>
                    <span>{post.createDate}</span>
                  </div>
                </Box>
                <Typography variant="h5" component="div">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.content}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" href={`/post/${post._id}`}>Lire Plus</Button>
              </CardActions>
            </Card>
         </Grid>
      ))}
    </Grid>
  );
};

export default PostList;
