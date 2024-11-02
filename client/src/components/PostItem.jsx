import { Card, CardContent, Typography, CardActions, Button, Box } from '@mui/material';

const PostItem = ({ post }) => {
  // recuperer l'api a ce niveau
  return (
    

    <Card>
      <CardContent>
        <Box className='flex flex-row gap-3'>
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
        <Button size="small" href={`/post/${post.id}`}>Lire Plus</Button>
      </CardActions>
    </Card>
  );
};

export default PostItem;
