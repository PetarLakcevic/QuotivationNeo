import React, { useState, useEffect, useLayoutEffect } from 'react';
import { getAuthor, getQuotes } from '../../../axios/axios';
import { useParams } from 'react-router-dom';
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
import { useNavigate } from 'react-router-dom';
import EditAuthor from './EditAuthor';
import DeleteAuthor from './DeleteAuthor';
import EditQuote from '../Qutoes/EditQuote';
import DeleteQuote from '../Qutoes/DeleteQuote';
import AddQuoteAuthor from './AddQouteAuthor';
import Header from '../../../components/Header';
import SlideUp from '../../../components/SlideUp';
import ListStyled from '../../../components/ListStyled';
import UserContainer from '../../../components/UserContainer';
import SearchComponent from '../../../components/SearchComponent';
import { Delete, Edit } from '@mui/icons-material';
import EditQuoteAuthor from './EditQuoteAuthor';
import DeleteQuoteAuthor from './DeleteQuoteAuthor';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Author = () => {
  const [author, setAuthor] = useState({});
  const [quotesByAuthor, setQuotesByAuthor] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [editQuoteDialog, setEditQuoteDialog] = useState(false);
  const [deleteQuoteDialog, setDeleteQuoteDialog] = useState(false);
  const [addQuoteDialog, setAddQuoteDialog] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const [page, setPage] = useState(1);
  const [quotesPerPage, setQuotesPerPage] = useState(5);

  const indexOfLastQuote = page * quotesPerPage;
  const indexOfFirstQuote = indexOfLastQuote - quotesPerPage;

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const { id } = useParams();
  const navigate = useNavigate();

  const handleSearch = event => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    setPage(1);
    setQuotesPerPage(5);
  };

  useEffect(() => {
    getAuthor(id)
      .then(response => {
        setAuthor(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  const currentQuotes = author?.quoteList
    ?.filter(quote => {
      if (searchTerm === '') {
        return quote;
      } else {
        const searchTerms = searchTerm.toLowerCase().split(' ');
        return searchTerms.every(term => quote.text.toLowerCase().includes(term));
      }
    })
    .slice((page - 1) * quotesPerPage, page * quotesPerPage);

  return (
    // <Box sx={{ overflow: 'hidden' }}>
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
          <Typography variant="h4">{author.name}</Typography>
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
                <TableCell>Quote</TableCell>
                <TableCell>Category</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentQuotes?.map((quote, index) => (
                <TableRow key={quote.id}>
                  <TableCell
                    sx={{
                      width: '1%',
                    }}
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell>{quote.text}</TableCell>
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
              mt: 2,
            }}
          >
            <Stack direction="row">
              <Pagination
                count={Math.ceil(author.quoteList?.length / quotesPerPage)}
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
      </Box>{' '}
      <SlideUp open={editDialog} onClose={() => setEditDialog(false)}>
        <EditAuthor author={author} setAuthor={setAuthor} setEditDialog={setEditDialog} />
      </SlideUp>
      <SlideUp open={deleteDialog} onClose={() => setDeleteDialog(false)}>
        <DeleteAuthor author={author} setDeleteDialog={setDeleteDialog} />
      </SlideUp>
      <SlideUp open={editQuoteDialog} onClose={() => setEditQuoteDialog(false)}>
        <EditQuoteAuthor quote={selectedQuote} setEditDialog={setEditQuoteDialog} setAuthor={setAuthor} />
      </SlideUp>
      <SlideUp open={deleteQuoteDialog} onClose={() => setDeleteQuoteDialog(false)}>
        <DeleteQuoteAuthor quote={selectedQuote} setDeleteDialog={setDeleteQuoteDialog} setAuthor={setAuthor} />
      </SlideUp>
      <SlideUp open={addQuoteDialog} onClose={() => setAddQuoteDialog(false)}>
        <AddQuoteAuthor author={author} setAddODialog={setAddQuoteDialog} setAuthor={setAuthor} />
      </SlideUp>
    </UserContainer>
  );
};

const setOnTop = () => {
  const x = 50;
  const y = 2;
  return {
    left: `${x}%`,
    top: `${y}%`,
    translate: `-${x}% 0%`,
  };
};

export default Author;
