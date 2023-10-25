import { Box, Typography, Switch, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import UserContainer from '../../components/UserContainer';
import UserContent from '../../components/UserContent';
import UserNavbar from '../../components/UserNavbar';
import { getCategories, setCategory, accountReq } from '../../axios/axios';
import { useNavigate } from 'react-router-dom';

const Category = ({ account, setAccount }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    if (account) {
      setSelectedCategories(account.categoryList)

    }
  }, [account])

  useEffect(() => {
    getCategories()
      .then(res => {
        setCategories(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleSubmit = () => {
    setCategory(selectedCategories).then(res => {
      accountReq().then(res => {
        setAccount(res.data);
        if (res.data.userAdditionalFields.themePicture) {
          navigate('/home')
        } else {
          navigate('/theme')
        }
      })
    })
  };


  return (
  
      <UserContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            gap: '1rem',
          }}
        >
          <Typography variant="h5" mt={3}>
            SELECT CATEGORIES
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 0 8px 3px rgba(0, 0, 0, 0.1)',
              borderRadius: '0.5rem',
              padding: '1rem',
              // maxHeight: '50vh',
              overflowY: 'scroll',
            }}
          >
            {categories.map(category => (
              <Box
                key={category.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  margin: '1rem 0',
                  width: '100%',
                  backgroundColor: 'white',
                  boxShadow: '0 0 8px 3px rgba(0, 0, 0, 0.2)',
                  borderRadius: '0.5rem',
                  padding: '2px 0.5rem',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    flexGrow: 1, // Add flexGrow
                    position: 'relative', // Add position property
                  }}
                >
                  <Box
                    sx={{
                      width: '7px',
                      position: 'absolute', // Add position property
                      top: 0, // Add top property
                      bottom: 0, // Add bottom property
                      backgroundImage: 'linear-gradient(90deg, hsl(193, 66%, 32%) , hsl(144, 25%, 57%), #aac0d0 )',
                      borderRadius: '5px',
                      alignSelf: 'stretch', // Add alignSelf property
                    }}
                  />
                  <Typography
                    variant="h6"
                    ml={2}
                    sx={{
                      fontSize: '1.2rem',
                    }}
                  >
                    {category.name}
                  </Typography>
                </Box>
                <Switch
                  checked={selectedCategories?.some(cat => cat.id === category.id)}
                  onChange={e => {
                    if (e.target.checked) {
                      setSelectedCategories([...selectedCategories, category]);
                    } else {
                      setSelectedCategories(selectedCategories.filter(cat => cat.id !== category.id));
                    }
                  }}
                  sx={{
                    '.MuiSwitch-thumb': {
                      width: '12px',
                      height: '12px',
                      marginTop: '9px',
                      marginLeft: selectedCategories?.some(cat => cat.id === category.id) ? '4px' : '9px',
                      padding: '1px',
                      color: selectedCategories?.some(cat => cat.id === category.id) ? 'white' : '#e9e9e9',
                      boxShadow: 'none',
                    },
                    '.MuiSwitch-switchBase': {
                      padding: '6px',
                      color: selectedCategories?.some(cat => cat.id === category.id) ? 'white' : '#e9e9e9',
                    },
                    '.MuiSwitch-track': {
                      opacity: 1,
                      borderRadius: '11px',
                      backgroundColor: 'rgba(0, 0, 0, 1)',
                      height: '18px',
                      backgroundSize: '100% 100%',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      backgroundImage: selectedCategories?.some(cat => cat.id === category.id)
                        ? 'linear-gradient(135deg, #fff, hsl(193, 66%, 32%) 10%, hsl(144, 25%, 47%), hsl(193, 66%, 32%))'
                        : 'linear-gradient(90deg, #d0d0d0 , #d0d0d0 )',
                    },
                  }}
                />
              </Box>
            ))}
          </Box>
          <Button
            variant="outlined"
            onPointerDown={handleSubmit}
            sx={{
              borderColor: '#478D8A',

              color: '#478D8A',
              mt: '1rem',
            }}
          >
            <Typography variant="h6">SAVE</Typography>
          </Button>
        </Box>
      </UserContent>

  );
};

export default Category;