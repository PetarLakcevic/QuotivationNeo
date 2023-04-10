import { Box } from '@mui/material';
import React from 'react';

const ContainerStyled = ({ children }) => {
  return (
    <Box
      sx={{
        width: '90%',
        height: '80vh',
        position: 'relative',
        top: '0rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '2rem',
        margin: '0 auto',
      }}
    >
      {children}
    </Box>
  );
};

export default ContainerStyled;
