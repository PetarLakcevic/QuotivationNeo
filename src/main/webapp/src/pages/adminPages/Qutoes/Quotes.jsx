import {
  Box,
  Button,
  Typography,
  Slide,
  Dialog,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  Pagination,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { getQuotes } from '../../../axios/axios.js';
import Header from '../../../components/Header.jsx';
import AddQuote from './AddQuote.jsx';
import QutesItem from './QutesItem.jsx';
import { useNavigate } from 'react-router-dom';
import SearchComponent from '../../../components/SearchComponent.jsx';
import { Delete, Edit } from '@mui/icons-material';
import SlideUp from '../../../components/SlideUp.jsx';
import EditQuote from './EditQuote.jsx';
import DeleteQuote from './DeleteQuote.jsx';
import ContainerStyled from '../../../components/ContainerStyled.jsx';
import UserContainer from '../../../components/UserContainer.jsx';
import UserNavbar from '../../../components/UserNavbar.jsx';
import UserContent from '../../../components/UserContent.jsx';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [addODialog, setAddODialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [quoteToEdit, setQuoteToEdit] = useState({});
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [quoteToDelete, setQuoteToDelete] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [quotesPerPage, setQuotesPerPage] = useState(5);
  const [sort, setSort] = useState({ field: '', order: 'asc' });

  const sortedQuotes = quotes => {
    return quotes.sort((a, b) => {
      if (sort.field === 'quote') {
        return sort.order === 'asc' ? a.text.localeCompare(b.text) : b.text.localeCompare(a.text);
      }
      if (sort.field === 'categories') {
        const aCategories = a.categories.map(c => c.name).join(', ');
        const bCategories = b.categories.map(c => c.name).join(', ');
        return sort.order === 'asc' ? aCategories.localeCompare(bCategories) : bCategories.localeCompare(aCategories);
      }
      if (sort.field === 'author') {
        return sort.order === 'asc' ? a.author?.name.localeCompare(b.author?.name) : b.author?.name.localeCompare(a.author?.name);
      }
      return 0;
    });
  };

  const changeSort = field => {
    setSort(prevSort => {
      const order = prevSort.field === field && prevSort.order === 'asc' ? 'desc' : 'asc';
      return { field, order };
    });
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

  const currentQuotes = sortedQuotes(quotes)
    .filter(quote => {
      if (searchTerm === '') {
        return quote;
      } else {
        const searchTerms = searchTerm.toLowerCase().split(' ');
        return searchTerms.every(term => quote.text.toLowerCase().includes(term));
      }
    })
    .slice((page - 1) * quotesPerPage, page * quotesPerPage);

  const handleEdit = q => {
    setEditDialog(true);
    setQuoteToEdit(q);
  };

  const handleDelete = q => {
    setDeleteDialog(true);
    setQuoteToDelete(q);
  };

  useEffect(() => {
    getQuotes()
      .then(response => {
        setQuotes(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <UserContainer>
      {/* <UserNavbar /> */}
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
          <Typography variant="h4">Quotes</Typography>
          <Button
            variant="contained"
            p={2}
            sx={{
              backgroundColor: 'hsl(144, 25%, 57%)',
              borderRadius: '1rem',
              boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.4)',
              fontSize: '1.2rem',
            }}
            color="success"
            onPointerDown={() => setAddODialog(true)}
          >
            Add new quote
          </Button>
        </Box>
        <SearchComponent onChange={handleSearch} value={searchTerm}>
          Search
        </SearchComponent>
        <TableContainer>
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
                <TableCell>ID</TableCell>
                <TableCell onClick={() => changeSort('quote')}  sx={{
                    cursor: 'pointer',
                  }}>
                  Quote
                  {sort.field === 'quote' ? (sort.order === 'asc' ? '▲' : '▼') : null}
                </TableCell>
                <TableCell onClick={() => changeSort('categories')}  sx={{
                    cursor: 'pointer',
                }}>Categories
                {sort.field === 'categories' ? (sort.order === 'asc' ? '▲' : '▼') : null}
                </TableCell>
                <TableCell onClick={() => changeSort('author')}  sx={{
                    cursor: 'pointer',
                }}>Author
                {sort.field === 'author' ? (sort.order === 'asc' ? '▲' : '▼') : null}
                </TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentQuotes.map((quote, index) => (
                <TableRow key={index}>
                  <TableCell
                    sx={{
                      width: '1%',
                    }}
                  >
                    {index + 1}.
                  </TableCell>
                  <TableCell align="left">{quote.text}</TableCell>
                  <TableCell>
                    {quote?.categories?.map(c => {
                      return (
                        <Typography
                          key={c.id}
                          variant="body2"
                          sx={{
                            cursor: 'pointer',
                            textDecoration: 'underline',
                            '&:hover': {
                              color: 'hsl(144, 25%, 57%)',
                            },
                          }}
                          onPointerDown={() => navigate(`/adminpanel/category/${c.id}`)}
                        >
                          {c.name}
                        </Typography>
                      );
                    })}
                  </TableCell>
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
                    {quote.author?.name}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      sx={{
                        color: 'hsl(190, 50%, 40%)',
                      }}
                      onPointerDown={() => handleEdit(quote)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      sx={{
                        color: 'hsl(360, 50%, 50%)',
                      }}
                      onPointerDown={() => handleDelete(quote)}
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
              mt: 2,
            }}
          >
            <Stack direction="row">
              <Pagination
                count={Math.ceil(quotes.length / quotesPerPage)}
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
      <SlideUp open={addODialog} onClose={() => setAddODialog(false)}>
        <AddQuote setAddODialog={setAddODialog} setQuotes={setQuotes} />
      </SlideUp>
      <SlideUp open={editDialog} onClose={() => setEditDialog(false)}>
        <EditQuote setEditDialog={setEditDialog} setQuotes={setQuotes} quotes={quotes} quote={quoteToEdit} />
      </SlideUp>
      <SlideUp open={deleteDialog} onClose={() => setDeleteDialog(false)}>
        <DeleteQuote setDeleteDialog={setDeleteDialog} setQuotes={setQuotes} quotes={quotes} quote={quoteToDelete} />
      </SlideUp>
    </UserContainer>
  );
};

export default Quotes;
