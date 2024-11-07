import {  Box ,Typography } from '@mui/material';
import PostList from '../components/PostList';
import Navbar from '../components/Navbar';

const HomePage = () => {

  return (
    
    <Box>
      <Navbar />
      <Typography variant="h4" gutterBottom>
        Articles récents
      </Typography>
      {console.log('home page')}
      <PostList />
    </Box>
  );
};

export default HomePage;
