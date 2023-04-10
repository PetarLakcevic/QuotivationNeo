import { Box } from '@mui/material';
import React from 'react';

const DialogStyled = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // minHeight: '100vh',
        // width: '60vw',
        padding: '2rem',
        backgroundImage: 'linear-gradient(to right, #f6f8fb, #f8ffff)',
        gap: '1rem',
      }}
    >
      {children}
    </Box>
  );
};

export default DialogStyled;
