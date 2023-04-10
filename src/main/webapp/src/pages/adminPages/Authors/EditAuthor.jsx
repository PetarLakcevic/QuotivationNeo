import { Box, Button, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import React, { useRef } from 'react';
import { getAuthor, updateAuthor } from '../../../axios/axios';

const EditAuthor = ({ author, setAuthor, setEditDialog }) => {
  const nameRef = useRef();

  const handleUpdate = e => {
    e.preventDefault();
    updateAuthor(author.id, nameRef.current.value)
      .then(response => {
        console.log(response);
        getAuthor(author.id)
          .then(response => {
            setAuthor(response.data);
            setEditDialog(false);
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
    setEditDialog(false);
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
      <form onSubmit={handleUpdate}>
        <FormControl>
          <InputLabel htmlFor="name">Name</InputLabel>
          <OutlinedInput inputRef={nameRef} id="name" type="text" label="Name" defaultValue={author.name} />
        </FormControl>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            marginTop: '5rem',
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="info"
            sx={{
              backgroundColor: 'hsl(190, 50%, 40%)',
            }}
          >
            Save
          </Button>
          <Button onPointerDown={handleCancel}>Cancel</Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditAuthor;
