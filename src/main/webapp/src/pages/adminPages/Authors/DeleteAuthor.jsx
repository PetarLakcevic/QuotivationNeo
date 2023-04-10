import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { deleteAuthor } from '../../../axios/axios';
import { useNavigate } from 'react-router-dom';

const DeleteAuthor = ({ author, setDeleteDialog }) => {
  const navigate = useNavigate();
  const handleDelete = id => {
    deleteAuthor(id)
      .then(response => {
        console.log(response);
        setDeleteDialog(false);
        navigate('/adminpanel/authors');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleCancel = () => {
    setDeleteDialog(false);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        padding: 3,
      }}
    >
      <Typography variant="h5">Are you sure you want to delete this author?</Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
          marginTop: '5rem',
        }}
      >
        <Button
          variant="contained"
          color="error"
          sx={{
            background: 'hsl(360, 50%, 50%)',
          }}
          onPointerDown={() => handleDelete(author.id)}
        >
          Delete
        </Button>{' '}
        <Button variant='outlined' onPointerDown={() => setDeleteDialog(false)}>Cancel</Button>
      </Box>
    </Box>
  );
};

export default DeleteAuthor;
