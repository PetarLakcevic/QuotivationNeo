import { Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { updateQuote, getQuotes, getAuthors, getCategories, getCategory } from '../../../axios/axios.js';
import DialogStyled from '../../../components/DialogStyled.jsx';

const EditQuoteCat = ({ category, quote, setEditQuoteDialog, setCategory }) => {
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);

  const [quoteText, setQuoteText] = useState(quote.text);
  const [selectedAuthor, setSelectedAuthor] = useState(quote.author);
  const [selectedCategories, setSelectedCategories] = useState(quote.categories ? [...quote.categories] : []);

  useEffect(() => {
    getAuthors()
      .then(response => {
        setAuthors(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getCategories()
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleUpdate = () => {
    updateQuote(quote.id, quoteText, selectedAuthor, selectedCategories, quote.id)
      .then(response => {
        console.log(response);
        getCategory(category.id)
          .then(response => {
            setCategory(response.data);
            setEditQuoteDialog(false);
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
    <DialogStyled>
      <Typography>Edit Quote</Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          width: '100%',
          maxWidth: '400px',
          margin: '0 auto',
          padding: '1rem',
        }}
      >
        <FormControl>
          <TextField
            id="quote"
            label="Quote"
            multiline
            rows={4}
            value={quoteText}
            onChange={e => setQuoteText(e.target.value)}
            variant="outlined"
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="author">Author</InputLabel>
          <Select id="author" value={selectedAuthor} onChange={e => setSelectedAuthor(e.target.value)}>
            {authors.map(author => (
              <MenuItem key={author.id} value={author}>
                {author.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
              <FormControl>
              <TextField
                  id="category"
                  label="Category"
                  variant="outlined"
                  value={category.name}
                  inputProps={{
                       readOnly: true,
                  }}
                  
              />
          {/* <InputLabel htmlFor="categories">Categories</InputLabel>
          <Select
            id="categories"
            multiple
            value={selectedCategories}
            onChange={e => setSelectedCategories(e.target.value)}
            // renderValue={selected => selected.join(', ')}
          >
            {categories.map(category => (
              <MenuItem key={category.id} value={category}>
                {category.name}
              </MenuItem>
            ))}
          </Select> */}
        </FormControl>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            marginTop: '5rem',
          }}
        >
          <Button
            variant="contained"
            color="info"
            sx={{
              backgroundColor: 'hsl(190, 50%, 40%)',
            }}
            onPointerDown={handleUpdate}
          >
            Update
          </Button>
          <Button variant="outlined" onPointerDown={() => setEditQuoteDialog(false)}>
            Cancel
          </Button>
        </Box>
      </Box>
    </DialogStyled>
  );
};

export default EditQuoteCat;
