import { Card,CardContent, Box,Grid, Typography } from '@mui/material';
import PostList from '../components/PostList';
import Navbar from '../components/Navbar';

const UserProfilePage = () => {
  const posts = [
    { id: 1, title: 'Article 1', excerpt: 'Résumé de l\'article 1...' },
    { id: 2, title: 'Article 2', excerpt: 'Résumé de l\'article 2...' },
  ];

  return (
    <Box>
      <Navbar />
      <Box sx={{backgroundColor: '#f1f1f1', height: '', padding: '20px 15px'}}>
        <Typography variant="h4" gutterBottom className='text-bold'>
          Dashboard

        </Typography>
        <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h4" component="div">
                      0
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Post reactions
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h4" component="div">
                      0
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Post commnents
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h4" component="div">
                      500
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Post view
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
        </Grid>
        
      </Box>
      <Box>
      <Grid container spacing={3}>
          <Grid item xs={12} md={4} >
            <Box className='m-6 p-2 rounded-md flex flex-row justify-between bg-[#f1f1f1]'>
              <span>Box</span>
              <span>0</span>
            </Box>
            <Box className='m-6 p-2 rounded-md flex flex-row justify-between bg-[#f1f1f1]'>
              <span>Posts</span>
              <span>0</span>
            </Box>
            <Box className='m-6 p-2 rounded-md flex flex-row justify-between bg-[#f1f1f1]'>
              <span>Followers</span>
              <span>0</span>
            </Box>
            <Box className='m-6 p-2 rounded-md flex flex-row justify-between bg-[#f1f1f1]'>
              <span>Following Users</span>
              <span>0</span>
            </Box>
            
          </Grid>
          <Grid item xs={12} md={8}  >
            <Box className='p-6 border-b-2'>
              <Typography variant="h5" gutterBottom className='text-bold'>
                Posts
              </Typography>
            </Box >
            <Box className='mt-6'>
              <PostList posts={posts}/>
            </Box>
           
          </Grid>
        </Grid>
      </Box>
      
          





      {/* <PostList posts={posts} /> */}
    </Box>
  );
};

export default UserProfilePage;
