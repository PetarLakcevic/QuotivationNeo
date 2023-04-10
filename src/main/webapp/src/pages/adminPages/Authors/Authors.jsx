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
// import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { getAuthors } from '../../../axios/axios';
import AddAuthor from './AddAuthor';
import EditAuthor from './EditAuthor';
import DeleteAuthor from './DeleteAuthor';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/Header';
import SlideUp from '../../../components/SlideUp';
import ListStyled from '../../../components/ListStyled';
import SearchComponent from '../../../components/SearchComponent';
import ListItemStyled from '../../../components/ListItemStyled';
import UserContainer from '../../../components/UserContainer';
import UserNavbar from '../../../components/UserNavbar';
import { Delete, Edit } from '@mui/icons-material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [addODialog, setAddODialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState({});

  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [quotesPerPage, setQuotesPerPage] = useState(5);

  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });

  const indexOfLastQuote = page * quotesPerPage;
  const indexOfFirstQuote = indexOfLastQuote - quotesPerPage;

  const sortedAuthors = authors => {
    const sorted = [...authors];

    sorted.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      // Ako sortiramo po dužini niza citata, uporedi dužine umesto nizova
      if (sortConfig.key === 'quoteList.length') {
        aValue = a.quoteList.length;
        bValue = b.quoteList.length;
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    return sorted;
  };

  const requestSort = key => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const currentAuthors = sortedAuthors(authors)
    .filter(author => {
      if (searchTerm === '') {
        return author;
      } else {
        const searchTerms = searchTerm.toLowerCase().split(' ');
        return searchTerms.every(term => author.name.toLowerCase().includes(term));
      }
    })
    .slice(indexOfFirstQuote, indexOfLastQuote);

  const navigate = useNavigate();

  useEffect(() => {
    getAuthors()
      .then(response => {
        setAuthors(response.data);
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
          <Typography variant="h4">Authors</Typography>
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
            Add new author
          </Button>
        </Box>
        <SearchComponent onChange={e => setSearchTerm(e.target.value)} value={searchTerm}>
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
                <TableCell
                  sx={{
                    width: '1%',
                  }}
                >
                  ID
                </TableCell>
                <TableCell
                  onPointerDown={() => requestSort('name')}
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  Name {sortConfig.key === 'name' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                </TableCell>
                <TableCell
                  align="center"
                  onPointerDown={() => requestSort('quoteList.length')}
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  Number of quotes {sortConfig.key === 'quoteList.length' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                </TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentAuthors.map((author, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}.</TableCell>
                  <TableCell
                    onPointerDown={() => {
                      navigate(`/adminpanel/author/${author.id}`);
                    }}
                    sx={{
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      '&:hover': {
                        color: 'hsl(144, 25%, 57%)',
                      },
                    }}
                  >
                    {author.name}
                  </TableCell>
                  <TableCell align="center">{author.quoteList.length}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      sx={{
                        color: 'hsl(190, 50%, 40%)',
                      }}
                      aria-label="edit"
                      onPointerDown={() => {
                        setSelectedAuthor(author);
                        setEditDialog(true);
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      sx={{
                        color: 'hsl(360, 50%, 50%)',
                      }}
                      aria-label="delete"
                      onPointerDown={() => {
                        setSelectedAuthor(author);
                        setDeleteDialog(true);
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
                count={Math.ceil(authors.length / quotesPerPage)}
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
        <AddAuthor setAddODialog={setAddODialog} setAuthors={setAuthors} />
      </SlideUp>
      <SlideUp open={editDialog} onClose={() => setEditDialog(false)}>
        <EditAuthor author={selectedAuthor} setAuthor={setSelectedAuthor} setEditDialog={setEditDialog} />
      </SlideUp>
      <SlideUp open={deleteDialog} onClose={() => setDeleteDialog(false)}>
        <DeleteAuthor author={selectedAuthor} setDeleteDialog={setDeleteDialog} />
      </SlideUp>
    </UserContainer>
  );
};

export default Authors;
