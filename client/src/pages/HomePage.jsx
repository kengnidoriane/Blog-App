import { useState, useEffect} from 'react'
import axios from 'axios';
import {  Box ,Typography } from '@mui/material';
import PostList from '../components/PostList';
import Navbar from '../components/Navbar';

const HomePage = () => {
  const apiURL = import.meta.env.VITE_API_URL;
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiURL}/articles`);
        const datas = response.data;
        setArticles(datas);
        console.log(datas);
        
      } catch (error) {
        setError(error);
      }
    }
    fetchData()
  })

  return (
    <Box>
      
         <Navbar />
      
      <Typography variant="h4" gutterBottom>
        Articles récents
      </Typography>
      <PostList posts={articles} />
    </Box>
  );
};

export default HomePage;
