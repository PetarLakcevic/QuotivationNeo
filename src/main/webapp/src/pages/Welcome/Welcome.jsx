import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import UserContainer from '../../components/UserContainer';
import UserContent from '../../components/UserContent';
import UserNavbar from '../../components/UserNavbar';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();
  return (     <UserContent>
    {/* // <UserContainer> */}
      {/* <UserNavbar /> */}
 
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '2rem',
            maxWidth: '760px',
            margin: '0 auto',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexDirection: 'column',
              textAlign: 'center',
              width: '100%',
              gap: '1rem',
            }}
          >
            <Typography variant="h3">Welcome!</Typography>
            <Typography variant="h6" mt={2}>Thank you for registering.</Typography>
            <Typography variant="body1">The next steps involve personalizing your account to cater to your needs.</Typography>
            <Typography variant="body1">
              You will have the option to select the types of quotes that resonate with you and choose a visual theme that aligns with your
              aesthetic preferences. Our selection of curated images will serve as the backdrop for your daily inspirational quotes.
            </Typography>
          </Box>
          <Button
            variant="outlined"
            color="primary"
            onPointerDown={() => navigate('/category')}
            sx={{
              //   marginInline: 'auto',
              borderColor: '#478D8A',
              color: '#478D8A',
              mt: '2rem',
            }}
          >
            <Typography variant="h6">Next</Typography>
          </Button>
        </Box>
      </UserContent>
    // </UserContainer>
  );
};

export default Welcome;
