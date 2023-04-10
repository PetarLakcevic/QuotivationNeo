import { AddToQueue } from '@mui/icons-material';
import { Box, Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import React, { useRef, useState, useEffect } from 'react';
import { addQuote, getAuthors, getCategories, getAuthor } from '../../../axios/axios.js';
import DialogStyled from '../../../components/DialogStyled.jsx';

const AddQuoteAuthor = ({ setAddODialog, setQuotes, setAuthor, author }) => {
  const textRef = useRef();

  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCategoriesId, setSelectedCategoriesId] = useState([]);

  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories()
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);


  useEffect(() => {
    setSelectedCategoriesId(selectedCategories.map(category => ({ id: category.id })));
  }, [selectedCategories]);

  const handleAdd = () => {
    // console.log(textRef.current.value, authorRef.current.value, );
    addQuote(textRef.current.value, author, selectedCategoriesId)
      .then(response => {
        console.log(response);
        getAuthor(author.id)
          .then(response => {
            setAuthor(response.data);
            setAddODialog(false);
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
    textRef.current.value = '';
    setSelectedAuthor(null);
    setSelectedCategories([]);
    setAddODialog(false);
  };

  return (
    <DialogStyled
      sx={{
        // gap: '1rem',
        width: '60vw',
    }}
    >
      <FormControl
        sx={{
          width: '100%',
        }}
      >
        <TextField
        multiline
        rows={4}
        id="text"
        label="Text"
        variant="outlined"
        inputRef={textRef}
      />
      </FormControl>
      <FormControl
        sx={{
          width: '100%',
        }}
      >
              <InputLabel htmlFor="author">Author</InputLabel>
              <OutlinedInput id="author" type="text" label="Author" defaultValue={author.name} disabled/>
        {/* <Select id="author" label="Author" value={selectedAuthor} onChange={event => setSelectedAuthor(event.target.value)}>
          {authors.map(author => {
            return (
              <MenuItem value={author} key={author.id}>
                {author.name}
              </MenuItem>
            );
          })}
        </Select> */}
      </FormControl>
      <FormControl
        sx={{
          width: '100%',
        }}
      >
        <InputLabel htmlFor="category">Category</InputLabel>
        <Select
          id="category"
          label="Category"
          multiple
          value={selectedCategories}
          onChange={event => setSelectedCategories(event.target.value)}
        >
          {categories.map(category => (
            <MenuItem key={category.name} value={category}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginTop: '5rem',
          width: 'min(500px, 90vw)',
        }}
      >
        <Button variant="contained" color='success' sx={{
           backgroundColor: 'hsl(144, 25%, 57%)'
        }} onPointerDown={handleAdd}>
          Add Quote
        </Button>
        <Button variant='outlined' onClick={handleCancel}>Cancel</Button>
      </Box>
    </DialogStyled>
  );
};

export default AddQuoteAuthor;
