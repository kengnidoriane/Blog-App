import {  Box ,Typography } from '@mui/material';
import PostList from '../components/PostList';

const HomePage = () => {

  return (
    
    <Box>
      <Typography variant="h4" gutterBottom>
        Articles récents
      </Typography>
      <PostList />
    </Box>
  );
};

export default HomePage;
