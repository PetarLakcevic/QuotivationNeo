import { ArrowBack, Sort } from '@mui/icons-material';
import React, { useState } from 'react';
import SlideLeft from './SlideLeft';
import { Box, Button, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const NoUserNavbar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
        {location.pathname !== '/'  && (  <ArrowBack sx={{
        position: 'fixed',
        top: '1rem',
        left: '1rem',
        color: 'white',
        cursor: 'pointer',
        zIndex: '1000',
        }} onClick={() => navigate('/')}
        titleAccess="Back to Home"
        />)}
        
      <Sort
        sx={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          transform: 'scaleX(-1)',
          color: 'white',
          cursor: 'pointer',
          zIndex: '1000',
        }}
        onClick={() => setOpenMenu(true)}
      />
      {(location.pathname === '/privacy' ||
        location.pathname === '/terms-&-conditions') && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1rem',
              backgroundImage:
                location.pathname === '/privacy' || location.pathname === '/terms-&-conditions'
                  ? 'linear-gradient(135deg, hsl(193, 66%, 32%) 0%, hsl(144, 25%, 57%) 90% )'
                  : 'none',
              boxShadow:
                location.pathname === '/privacy' || location.pathname === '/terms-&-conditions'
                  ? '-1px 2px 10px 1px rgba(0, 0, 0, 0.4)'
                  : 'none',
              position: 'relative',
              zIndex: 1,
              width: '100%',
              height: location.pathname === '/privacy' || location.pathname === '/terms-&-conditions' ? '5rem' : '0rem',
              position: 'sticky',
              top: 0,
            }}
          ></Box>
        )}
      <SlideLeft open={openMenu} onClose={() => setOpenMenu(false)}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            minHeight: window.innerHeight,
            padding: '2rem',
            backgroundImage: 'linear-gradient(135deg, hsl(193, 66%, 32%), hsl(144, 25%, 57%), #aac0d0)',
            gap: '1rem',
            position: 'relative',
            top: 0,
            left: 0,
          }}
        >
          <Button
            onPointerDown={() => {
              setOpenMenu(false);
              navigate('/');
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: 'white',
              }}
            >
              Home
            </Typography>
          </Button>
          <Button
            onPointerDown={() => {
              setOpenMenu(false);
              navigate('/privacy');
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: 'white',
              }}
            >
              Privacy Policy
            </Typography>
          </Button>
          <Button
            onPointerDown={() => {
              setOpenMenu(false);
              navigate('/terms-&-conditions');
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: 'white',
              }}
            >
              Terms & Conditions
            </Typography>
          </Button>
          <Button
            onPointerDown={() => {
              setOpenMenu(false);
              navigate('/register');
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: 'white',
              }}
            >
              Register
            </Typography>
          </Button>
          <Button
            onPointerDown={() => {
              setOpenMenu(false);
              navigate('/login');
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: 'white',
              }}
            >
              Login
            </Typography>
          </Button>
        </Box>
      </SlideLeft>
    </>
  );
};

export default NoUserNavbar;
