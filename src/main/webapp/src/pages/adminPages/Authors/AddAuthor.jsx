import { Button, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { Box } from '@mui/system';
import React, { useRef } from 'react';
import { addAuthor, getAuthors } from '../../../axios/axios';

const AddAuthor = ({ setAddODialog, setAuthors }) => {
  const name = useRef();

  const handleSubmit = e => {
    e.preventDefault();
    addAuthor(name.current.value)
      .then(response => {
        setAddODialog(false);
        getAuthors()
          .then(response => {
            setAuthors(response.data);
            name.current.value = '';
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleCancel = () => {
    setAddODialog(false);
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
      <form onSubmit={handleSubmit}>
        <FormControl
          sx={{
            width: '100%',
          }}
        >
          <InputLabel htmlFor="name">Name</InputLabel>
          <OutlinedInput inputRef={name} id="name" type="text" label="Name" />
        </FormControl>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            marginTop: '2rem',
          }}
        >
          <Button type="submit" variant="contained" color='success' sx={{
           backgroundColor: 'hsl(144, 25%, 57%)'
        }}>
            Add
          </Button>
          <Button variant='outlined' onClick={handleCancel}>Cancel</Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddAuthor;
