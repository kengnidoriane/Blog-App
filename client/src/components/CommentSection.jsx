import React from 'react';
import { Typography, TextField, Button, Box, List, ListItem, ListItemText } from '@mui/material';

const CommentSection = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = React.useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <Box>
      <Typography variant="h6">Commentaires</Typography>
      <List>
        {comments.map((comment, index) => (
          <ListItem key={index}>
            <ListItemText primary={comment} />
          </ListItem>
        ))}
      </List>
      <TextField
        fullWidth
        label="Ajouter un commentaire"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        multiline
        rows={4}
        margin="normal"
      />
      <Button variant="contained" onClick={handleAddComment}>Ajouter</Button>
    </Box>
  );
};

export default CommentSection;
