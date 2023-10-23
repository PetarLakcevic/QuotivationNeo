import React, { useEffect, useState } from 'react';
import UserContainer from '../../components/UserContainer';
import UserNavbar from '../../components/UserNavbar';
import UserContent from '../../components/UserContent';
import { Box, Button, Typography } from '@mui/material';
import qq from '../../assets/images/qq.png';

const Home = () => {
  return (
    <UserContainer>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1rem',
          backgroundImage: 'linear-gradient(135deg, hsl(193, 66%, 32%) 0%, hsl(144, 25%, 57%) 90% )',
          boxShadow: '-1px 2px 10px 1px rgba(0, 0, 0, 0.4)',
          position: 'relative',
          zIndex: 1,
          width: '100%',
        }}
      >
        <img src={qq} alt="logo" style={{ width: '50px', height: '50px' }} />
      </Box>
      <UserContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            maxWidth: '760px',
            margin: '0 auto',
            textAlign: 'center',
            gap: '1rem',
            mt: '2rem',
          }}
        >
          <Typography variant="h4">Welcome to Quotivation.io</Typography>
          <Typography variant="h5">
            Quotes are more than just words on paper. They are guides, motivators, and catalysts that can profoundly change our lives for
            the better.
          </Typography>
          <Typography variant="body1">
            With Quotivation.io, we bring you a unique way to discover and experience the power of words.
          </Typography>
          <Typography variant="body1">
            In the first 7 days, enjoy our trial offer where you'll receive two thought-provoking quotes daily to inspire and motivate you.
          </Typography>
          <Typography variant="body1">
            After the trial period, you'll continue to receive one quote every three days. However, you can always upgrade to our annual
            subscription to not only receive two quotes daily but also gain access to other premium features like your quote history.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              gap: '1rem',
              mt: '1rem',
            }}
          >
            <Button
              variant="contained"
              sx={{
                //   marginInline: 'auto',
                bgcolor: '#478D8A',
              }}
              // onPointerDown={() => navigate('Login')}
              // disabled={!agree}
            >
              {' '}
              <Typography variant="body1" sx={{ color: '#fff' }}>
                Log in
              </Typography>
            </Button>
            <Button
              variant="outlined"
              sx={{
                //   marginInline: 'auto',
                borderColor: '#478D8A',
                color: '#478D8A',
              }}
              // onPointerDown={() => navigate('Login')}
              // disabled={!agree}
            >
              {' '}
              <Typography variant="body1">Register</Typography>
            </Button>
          </Box>
        </Box>
      </UserContent>
    </UserContainer>
  );
};

export default Home;
