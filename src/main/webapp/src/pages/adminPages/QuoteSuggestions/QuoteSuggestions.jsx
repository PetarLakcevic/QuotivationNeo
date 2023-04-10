import React, { useState, useEffect } from 'react';
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
import ContainerStyled from '../../../components/ContainerStyled';
import Header from '../../../components/Header';
import { getSuggestions } from '../../../axios/axios';
import ListStyled from '../../../components/ListStyled';
import ListItemStyled from '../../../components/ListItemStyled';
import SearchComponent from '../../../components/SearchComponent';
import UserContainer from '../../../components/UserContainer';
import UserNavbar from '../../../components/UserNavbar';

const QuoteSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [quotesPerPage, setQuotesPerPage] = useState(5);

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

  const currentSuggestion = suggestions
    .filter(quote => {
      if (searchTerm === '') {
        return quote;
      } else {
        const searchTerms = searchTerm.toLowerCase().split(' ');
        return searchTerms.every(term => quote.text.toLowerCase().includes(term));
      }
    })
    .slice((page - 1) * quotesPerPage, page * quotesPerPage);
  useEffect(() => {
    getSuggestions()
      .then(response => {
        setSuggestions(response.data);
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
          <Typography variant="h4">Quote Suggestions</Typography>
        </Box>
        <SearchComponent onChange={e => setSearchTerm(e.target.value)} searchTerm={searchTerm}>
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
                <TableCell>Suggestion</TableCell>
                <TableCell align="right">>Author</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentSuggestion.map((suggestion, index) => (
                <TableRow key={index}>
                  <TableCell sx={{
                    width: '1%',
                  }}>{suggestion.id}.</TableCell>
                  <TableCell align="left">{suggestion.text}</TableCell>
                  <TableCell align="right">{suggestion.author}</TableCell>
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
                count={Math.ceil(suggestions.length / quotesPerPage)}
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
    </UserContainer>
  );
};

export default QuoteSuggestions;
