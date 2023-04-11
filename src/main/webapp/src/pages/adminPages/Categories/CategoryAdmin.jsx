import React, { useState, useEffect } from 'react';
import { deleteCategory, getCategories, getCategory, updateCategory } from '../../../axios/axios';
import { useParams, useNavigate } from 'react-router-dom';
import UserContainer from '../../../components/UserContainer';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  OutlinedInput,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import SearchComponent from '../../../components/SearchComponent';
import { Delete, Edit } from '@mui/icons-material';
import SlideUp from '../../../components/SlideUp';
import AddQuoteCat from './AddQuoteCat';
import DeleteQuote from '../Qutoes/DeleteQuote';
import DeleteQuoteCat from './DeleteQuoteCat';
import EditQuoteCat from './EditQuoteCat';
import DialogStyled from '../../../components/DialogStyled';

const CategoryAdmin = () => {
  const [category, setCategory] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [editQuoteDialog, setEditQuoteDialog] = useState(false);
  const [deleteQuoteDialog, setDeleteQuoteDialog] = useState(false);
  const [addQuoteDialog, setAddQuoteDialog] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const [page, setPage] = useState(1);
  const [quotesPerPage, setQuotesPerPage] = useState(5);

  const [sort, setSort] = useState({ field: '', order: 'asc' });

  const sortedQuotes = quotes => {
    return quotes?.sort((a, b) => {
      if (sort.field === 'quote') {
        return sort.order === 'asc' ? a.text.localeCompare(b.text) : b.text.localeCompare(a.text);
      }
      if (sort.field === 'author') {
        return sort.order === 'asc' ? a.author.name.localeCompare(b.author.name) : b.author.name.localeCompare(a.author.name);
      }
      return 0;
    });
  };

  const changeSort = field => {
    const order = sort.field === field && sort.order === 'asc' ? 'desc' : 'asc';
    setSort({ field, order });
  };

  const indexOfLastQuote = page * quotesPerPage;
  const indexOfFirstQuote = indexOfLastQuote - quotesPerPage;

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleSearch = event => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    setPage(1);
    setQuotesPerPage(5);
  };

  const submitEdit = () => {
    updateCategory(category.id, category.name, category.quotes)
      .then(response => {
        console.log(response);
        setEditDialog(false);
        // getCategories()
        //   .then(response => {
        //     setCategories(response.data);

        //   })
        //   .catch(error => {
        //     console.log(error);
        //   });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const cancelEdit = () => {
    setEditDialog(false);
  };

  const submitDelete = () => {
    deleteCategory(category.id)
      .then(response => {
        console.log(response);
        getCategories()
          .then(response => {
            // setCategories(response.data);
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

  const cancelDelete = () => {
    setDeleteDialog(false);
  };

  const currentQuotes = sortedQuotes(category.quotes)?.filter(quote => {
    if (searchTerm === '') {
      return quote;
    } else {
      const searchTerms = searchTerm.toLowerCase().split(' ');
      return searchTerms.every(term => {
        quote.text.toLowerCase().includes(term);
      });
    }
  });

  useEffect(() => {
    getCategory(id)
      .then(response => {
        setCategory(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <UserContainer>
      <Box
        sx={{
          backgroundColor: 'white',
          flexGrow: 1,
          overflow: 'auto',
          padding: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 5,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography variant="h4">{category.name}</Typography>
          <Box>
            <Button
              variant="contained"
              p={2}
              sx={{
                backgroundColor: 'hsl(144, 25%, 57%)',
                borderRadius: '1rem',
                boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.4)',
                fontSize: '1.2rem',
                mr: 2,
              }}
              color="success"
              onPointerDown={() => setAddQuoteDialog(true)}
            >
              Add Quote
            </Button>
            <Button
              variant="contained"
              p={2}
              sx={{
                backgroundColor: 'hsl(190, 50%, 40%)',
                borderRadius: '0.8rem',
                boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.2)',
                fontSize: '1.2rem',
                mr: 2,
              }}
              color="info"
              onClick={() => setEditDialog(true)}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              p={2}
              sx={{
                backgroundColor: 'hsl(360, 50%, 50%)',
                borderRadius: '0.8rem',
                boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.2)',
                fontSize: '1.2rem',
              }}
              color="warning"
              onClick={() => setDeleteDialog(true)}
            >
              Delete
            </Button>
          </Box>
        </Box>
        <SearchComponent onChange={handleSearch} value={searchTerm}>
          Search
        </SearchComponent>
        <TableContainer sx={{ width: '100%' }}>
          <Table>
            <TableHead
              sx={{
                position: 'sticky',
                top: 0,
                zIndex: 1,
                backgroundColor: 'white',
              }}
            >
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell
                  onPointerDown={() => changeSort('quote')}
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  Quote 
                  {sort.field === 'quote' ? (sort.order === 'asc' ? '▲' : '▼') : ('')}
                </TableCell>
                <TableCell
                  onPointerDown={() => changeSort('author')}
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  Author
                  {sort.field === 'author' ? (sort.order === 'asc' ? '▲' : '▼') : ('')}
                </TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentQuotes?.slice(indexOfFirstQuote, indexOfLastQuote).map(quote => (
                <TableRow key={quote.id}>
                  <TableCell
                    sx={{
                      width: '1%',
                    }}
                  >
                    {quote.id}.
                  </TableCell>
                  <TableCell>{quote.text}</TableCell>
                  <TableCell
                    sx={{
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      '&:hover': {
                        color: 'hsl(144, 25%, 57%)',
                      },
                    }}
                    onPointerDown={() => navigate(`/adminpanel/author/${quote.author.id}`)}
                  >
                    {quote.author.name}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => {
                        setEditQuoteDialog(true);
                        setSelectedQuote(quote);
                      }}
                      sx={{
                        color: 'hsl(190, 50%, 40%)',
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setDeleteQuoteDialog(true);
                        setSelectedQuote(quote);
                      }}
                      sx={{
                        color: 'hsl(360, 50%, 50%)',
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
              mt: 2,
            }}
          >
            <Stack spacing={2} direction="row">
              <Pagination
                count={Math.ceil(currentQuotes?.length / quotesPerPage)}
                page={page}
                onChange={handleChangePage}
                sx={{
                  '& .Mui-selected': {
                    background: 'hsl(144, 25%, 57%) !important',
                    color: 'white',
                  },
                }}
              />
            </Stack>
          </Box>
        </TableContainer>
      </Box>
      <SlideUp open={editDialog} onClose={() => setEditDialog(false)}>
        <DialogStyled>
          <Typography variant="h6">Edit Category</Typography>
          <form
            onSubmit={e => {
              e.preventDefault();
              submitEdit();
            }}
          >
            <FormControl fullWidth>
              <InputLabel>Name</InputLabel>
              <OutlinedInput
                value={category.name}
                // onChange={e => setSelectedCategory({ ...category, name: e.target.value })}
                onChange={e => setCategory({ ...category, name: e.target.value })}
              />
            </FormControl>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mt: 2,
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: 'hsl(190, 50%, 40%)',
                }}
                color="info"
                type="submit"
              >
                Edit
              </Button>
              <Button variant="outlined" onPointerDown={cancelEdit}>
                Cancel
              </Button>
            </Box>
          </form>
        </DialogStyled>
      </SlideUp>
      <SlideUp open={deleteDialog} onClose={() => setDeleteDialog(false)}>
        <DialogStyled>
          {/* <Typography variant="h6">Delete Category</Typography> */}
          <Typography variant="h5">Are you sure you want to delete this category?</Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: 5,
              gap: 3,
            }}
          >
            <Button
              variant="contained"
              sx={{
                background: 'hsl(360, 50%, 50%)',
              }}
              color="error"
              onPointerDown={submitDelete}
            >
              Delete
            </Button>
            <Button variant="outlined" onPointerDown={cancelDelete}>
              Cancel
            </Button>
          </Box>
        </DialogStyled>
      </SlideUp>
      <SlideUp open={editQuoteDialog} onClose={() => setEditQuoteDialog(false)}>
        <EditQuoteCat quote={selectedQuote} setEditQuoteDialog={setEditQuoteDialog} setCategory={setCategory} category={category} />
      </SlideUp>
      <SlideUp open={deleteQuoteDialog} onClose={() => setDeleteQuoteDialog(false)}>
        <DeleteQuoteCat quote={selectedQuote} setDeleteQuoteDialog={setDeleteQuoteDialog} setCategory={setCategory} category={category} />
      </SlideUp>
      <SlideUp open={addQuoteDialog} onClose={() => setAddQuoteDialog(false)}>
        <AddQuoteCat category={category} setCategory={setCategory} setAddQuoteDialog={setAddQuoteDialog} />
      </SlideUp>
    </UserContainer>
  );
};

export default CategoryAdmin;
