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
import { getUsers, deleteUser } from '../../../axios/axios';
import ListStyled from '../../../components/ListStyled';
import ListItemStyled from '../../../components/ListItemStyled';
import SearchComponent from '../../../components/SearchComponent';
// import { Box } from '@mui/system';
import { Delete } from '@mui/icons-material';
import UserContainer from '../../../components/UserContainer';
import UserNavbar from '../../../components/UserNavbar';
import SlideUp from '../../../components/SlideUp';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [sort, setSort] = useState({ field: '', order: 'asc' });

  const sortedUsers = users => {
    return users.sort((a, b) => {
      if (sort.field === 'login') {
        return sort.order === 'asc' ? a.login.localeCompare(b.login) : b.login.localeCompare(a.login);
      }
    });
  };

  const changeSort = field => {
    const order = sort.field === field && sort.order === 'asc' ? 'desc' : 'asc';
    setSort({ field, order });
  };

  const indexOfLastQuote = page * usersPerPage;
  const indexOfFirstQuote = indexOfLastQuote - usersPerPage;

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const currentUsers = sortedUsers(users)
    .filter(user => {
      if (searchTerm === '') {
        return user;
      } else {
        const searchTerms = searchTerm.toLowerCase().split(' ');
        return searchTerms.every(term => user.login.toLowerCase().includes(term));
      }
    })
    .slice(indexOfFirstQuote, indexOfLastQuote);

  useEffect(() => {
    getUsers()
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleDelete = id => {
    deleteUser(id)
      .then(response => {
        console.log(response);
        getUsers()
          .then(response => {
            setUsers(response.data);
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
          <Typography variant="h4">Users</Typography>
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
                <TableCell
                sx={{
                    cursor: 'pointer',
                  }}
                onPointerDown={() => changeSort('login')}
                >User 
                {sort.field === 'login' && sort.order === 'asc' ? '▲' : '▼'}
                
                </TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentUsers.map((user, index) => (
                <TableRow key={index}>
                  <TableCell
                    sx={{
                      width: '1%',
                    }}
                  >
                    {index + 1}.
                  </TableCell>
                  <TableCell>{user.login}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      sx={{
                        color: 'hsl(360, 50%, 50%)',
                      }}
                      onPointerDown={() => {
                        setDeleteDialog(true);
                        setSelectedUser(user);
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>{' '}
          </Table>
          {users.length > 5 && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: 2,
              }}
            >
              <Stack direction="row">
                <Pagination
                  count={Math.ceil(users.length / usersPerPage)}
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
          )}
        </TableContainer>
      </Box>
      <SlideUp open={deleteDialog} onClose={() => setDeleteDialog(false)}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            padding: 3,
          }}
        >
          <Typography variant="h5">Are you sure you want to delete this user?</Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 3,
            }}
          >
            <Button
              variant="contained"
              sx={{
                background: 'hsl(360, 50%, 50%)',
              }}
              color="error"
              onPointerDown={() => {
                handleDelete(selectedUser.id);
                setDeleteDialog(false);
              }}
            >
              Delete
            </Button>
            <Button variant="outlined" onClick={() => setDeleteDialog(false)}>
              Cancel
            </Button>
          </Box>
        </Box>
      </SlideUp>
    </UserContainer>
  );
};

export default Users;
