import { Fade } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const ListStyled = ({ children }) => {
    return (
        <Fade in={true}
            timeout={500}
        >
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.4)',
        borderRadius: '1rem',
        maxHeight: 'calc(65%)',
        overflowY: 'scroll',
        display: 'flex',
        flexDirection: 'column',
        margin: '0 auto',
      }}
    >
      {children}
            </Box>
        </Fade>
  );
};

export default ListStyled;
