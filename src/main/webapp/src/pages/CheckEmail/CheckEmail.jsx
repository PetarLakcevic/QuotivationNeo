import { Box, Typography, Container } from '@mui/material';
import logo from '../../assets/images/logo.png';

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CheckEmail = () => {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      navigate('/login');
    }
  }, [seconds]);
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'linear-gradient(135deg, hsl(193, 66%, 32%), hsl(144, 25%, 57%), #aac0d0)',
        color: 'black',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: 'min(100vw, 300px)',
            mb: '1rem',
          }}
        >
          <img
            src={logo}
            alt="logo"
            style={{
              width: '6rem',
            }}
          />
          <Typography variant="h5" sx={{ textAlign: 'center', color: 'black', marginLeft: '-0.3rem' }}>
            uotivation
          </Typography>
        </Box>
        <Typography variant="h5" sx={{ textAlign: 'center', color: 'black', mb: '1rem' }}>
          Check your email for and click the link to reset your password. You will be redirected to the{' '}
          <Link
            to="/login"
            style={{
              textDecoration: 'none',
            }}
          >
            login{' '}
          </Link>{' '}
          page in {seconds} seconds.
        </Typography>
      </Container>
    </Box>
  );
};

export default CheckEmail;
