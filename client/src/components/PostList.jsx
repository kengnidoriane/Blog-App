import { Grid} from '@mui/material';
import PostItem from './PostItem';

const PostList = ({ posts }) => {
  return (
    <Grid container spacing={4}>
      {posts.map((post) => (
        <Grid item key={post.id} xs={12} sm={6} md={4}>
          <PostItem post={post} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PostList;
