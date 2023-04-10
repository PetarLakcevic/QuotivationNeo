import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import UserContainer from '../../../components/UserContainer';
import UserNavbar from '../../../components/UserNavbar';

const AdminPanel = () => {
  const pages = ['quotes', 'authors', 'categories', 'quote_suggestions', 'users'];
  const [showOnTheTop, setShowOnTheTop] = useState(null);
  const navigate = useNavigate();
  const buttonRefs = useRef([]);

  // Funkcija za izračunavanje najveće širine dugmeta
  const getMaxButtonWidth = () => {
    const widths = buttonRefs.current.map(ref => ref.offsetWidth);
    return Math.max(...widths);
  };

  useEffect(() => {
    // Postavljanje širine dugmeta na osnovu najduže širine
    const maxWidth = getMaxButtonWidth();
    buttonRefs.current.forEach(ref => {
      ref.style.width = `${maxWidth + 50}px`;
    });
  }, []);

  return (
    <UserContainer>
      {/* <UserNavbar /> */}
      <Box
        sx={{
          width: '100%',
          height: '80vh',
          position: 'relative',
          overflow: 'hidden',
          top: '0rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '3rem',
        }}
      >
        {pages.map((page, index) => (
          <Button
            key={index}
            ref={el => (buttonRefs.current[index] = el)}
            variant="contained"
            sx={{
              backgroundImage: 'linear-gradient(135deg, hsl(173, 56%, 32%) 0%, hsl(154, 25%, 57%) 90% )',
              borderRadius: '1rem',
              boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.6)',
              fontSize: '1.2rem',
              width: 'auto',
              // padding: '0rem 6rem',
            }}
            color="success"
            onPointerDown={() => navigate(`/adminpanel/${page}`)}
          >
            <Typography>{page.replace("_", " ")}</Typography>
          </Button>
        ))}
      </Box>
    </UserContainer>
  );
};

export default AdminPanel;
