import { Delete } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { deleteQuote, getQuotes } from '../../../axios/axios.js';

const DeleteQuote = ({ quote, setDeleteDialog, setQuotes }) => {
  const handleDelete = () => {
    deleteQuote(quote.id)
      .then(response => {
        console.log(response);
        getQuotes()
          .then(response => {
            setQuotes(response.data);
            setDeleteDialog(false);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
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
      <Typography variant="h5">Are you sure you want to delete this quote?</Typography>
      {/* <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '1rem',
          gap: '2rem',
          marginTop: '5rem',
          boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.4)',
          width: '100%',
        }}
      >
        <Typography>{quote.text}</Typography>
        <Typography>{quote.author ? quote.author.name : " "}</Typography>
      </Box> */}
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
          // startIcon={<Delete />}
          variant="contained"
          color="error"
          onPointerDown={handleDelete}
          sx={{
            background: 'hsl(360, 50%, 50%)',
          }}
        >
          Delete
        </Button>
        <Button
         variant="outlined"
          onClick={() => setDeleteDialog(false)}>Cancel</Button>
      </Box>
    </Box>
  );
};

export default DeleteQuote;
