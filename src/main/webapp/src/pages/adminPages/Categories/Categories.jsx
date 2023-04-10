import { Delete, Edit } from '@mui/icons-material';
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
  FormControl,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import { getCategories, addCategory, updateCategory, deleteCategory, getCategory } from '../../../axios/axios';
import ContainerStyled from '../../../components/ContainerStyled';
import DialogStyled from '../../../components/DialogStyled';
import Header from '../../../components/Header';
import ListItemStyled from '../../../components/ListItemStyled';
import ListStyled from '../../../components/ListStyled';
import SearchComponent from '../../../components/SearchComponent';
import SlideUp from '../../../components/SlideUp';
import UserContainer from '../../../components/UserContainer';
import UserNavbar from '../../../components/UserNavbar';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [addNewDialog, setAddNewDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});
  const nameRef = useRef();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [categoriesPerPage, setcategoriesPerPage] = useState(5);

  const indexOfLastQuote = page * categoriesPerPage;
  const indexOfFirstQuote = indexOfLastQuote - categoriesPerPage;

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const currentCategory = categories
    .filter(category => {
      if (searchTerm === '') {
        return category;
      } else {
        const searchTerms = searchTerm.toLowerCase().split(' ');
        return searchTerms.every(term => category.text.toLowerCase().includes(term));
      }
    })
    .slice((page - 1) * categoriesPerPage, page * categoriesPerPage);

  const handleEdit = id => {
    setEditDialog(true);
    setSelectedCategory(categories.find(category => category.id === id));
  };

  const submitEdit = () => {
    updateCategory(selectedCategory.id, selectedCategory.name, selectedCategory.quotes)
      .then(response => {
        console.log(response);
        getCategories()
          .then(response => {
            setCategories(response.data);
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

  const cancelEdit = () => {
    setEditDialog(false);
  };

  const handleDelete = id => {
    setDeleteDialog(true);
    setSelectedCategory(categories.find(category => category.id === id));
  };

  const submitDelete = () => {
    deleteCategory(selectedCategory.id)
      .then(response => {
        console.log(response);
        getCategories()
          .then(response => {
            setCategories(response.data);
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

  const handleAddNew = () => {
    setAddNewDialog(true);
  };

  const submitAddNew = () => {
    addCategory(nameRef.current.value)
      .then(response => {
        console.log(response);
        getCategories()
          .then(response => {
            setCategories(response.data);
            setAddNewDialog(false);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getCategories()
      .then(response => {
        setCategories(response.data);
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
          <Typography variant="h4">Categories</Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: 'hsl(144, 25%, 57%)',
              borderRadius: '1rem',
              boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.4)',
              fontSize: '1.2rem',
            }}
            color="success"
            onPointerDown={() => setAddNewDialog(true)}
          >
            Add Category
          </Button>
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
                <TableCell>Category</TableCell>
                {/* <TableCell align="center">Number of quoutes</TableCell> */}
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentCategory.map((category, index) => (
                <TableRow key={index}>
                  <TableCell
                    sx={{
                      width: '1%',
                    }}
                  >
                    {category.id}.
                  </TableCell>
                  <TableCell
                    sx={{
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      '&:hover': {
                        color: 'hsl(144, 25%, 57%)',
                      },
                    }}
                    align="left"
                    onPointerDown={() => navigate(`/adminpanel/category/${category.id}`)}
                  >
                    {category.name}
                  </TableCell>
                  {/* <TableCell align="center">{category.quotes.length}</TableCell> */}
                  <TableCell align="right">
                    <IconButton
                      sx={{
                        color: 'hsl(190, 50%, 40%)',
                      }}
                      onPointerDown={() => handleEdit(category.id)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      sx={{
                        color: 'hsl(360, 50%, 50%)',
                      }}
                      onPointerDown={() => handleDelete(category.id)}
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
                count={Math.ceil(categories.length / categoriesPerPage)}
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
      <SlideUp
        open={editDialog}
        onClose={() => setEditDialog(false)}
        title="Edit Category"
        content="Edit Category"
        action="Edit"
        actionFunction={() => console.log('Edit Category')}
      >
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
                value={selectedCategory.name}
                onChange={e => setSelectedCategory({ ...selectedCategory, name: e.target.value })}
                onPointerDown={() => {
                  getCategory(selectedCategory.id)
                    .then(response => {
                      console.log(response);
                    })
                    .catch(error => {
                      console.log(error);
                    });
                }}
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
      <SlideUp
        open={deleteDialog}
        onClose={() => setDeleteDialog(false)}
        title="Delete Category"
        content="Delete Category"
        action="Delete"
        actionFunction={() => console.log('Delete Category')}
      >
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
      <SlideUp
        open={addNewDialog}
        onClose={() => setAddNewDialog(false)}
        title="Add Category"
        content="Add Category"
        action="Add"
        actionFunction={() => console.log('Add Category')}
      >
        <DialogStyled>
          <Typography variant="h6">Add Category</Typography>
          <form
            onSubmit={e => {
              e.preventDefault();
              submitAddNew();
            }}
          >
            <FormControl fullWidth>
              <InputLabel>Name</InputLabel>
              <OutlinedInput inputRef={nameRef} />
            </FormControl>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mt: 5,
              }}
            >
              <Button
                variant="contained"
                color="success"
                sx={{
                  backgroundColor: 'hsl(144, 25%, 57%)',
                }}
                color="success"
                type="submit"
              >
                Add
              </Button>
              <Button variant="outlined" onPointerDown={() => setAddNewDialog(false)}>
                Cancel
              </Button>
            </Box>
          </form>
        </DialogStyled>
      </SlideUp>
    </UserContainer>
  );
};

export default Categories;
