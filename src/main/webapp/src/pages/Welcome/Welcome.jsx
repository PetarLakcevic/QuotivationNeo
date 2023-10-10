import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import UserContainer from '../../components/UserContainer';
import UserContent from '../../components/UserContent';
import UserNavbar from '../../components/UserNavbar';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <UserContainer>
      <UserNavbar />
      <UserContent>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '2rem',
          maxWidth: '760px',
          margin: '0 auto',
        }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexDirection: 'column',
              textAlign: 'center',
              width: '100%',
              gap: '2rem',
            }}
          >
            <Typography variant="h3">Welcome!</Typography>
            <Typography variant="h6">Thank you for registering. Please proceed to the next step.</Typography>
          </Box>
          <Button variant='outlined' color='primary'
          onPointerDown={() => navigate('/category')} sx={{
            mt: 2
          }}
          >
            <Typography variant="h6">Next</Typography>
          </Button>
        </Box>
      </UserContent>
    </UserContainer>
  );
};

export default Welcome;
