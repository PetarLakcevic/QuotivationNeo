import { Box } from '@mui/material';
import React from 'react';

const UserContent = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: 'white',
        flexGrow: 1,
        overflow: 'auto',
        padding: 2,
      }}
    >
      {children}
    </Box>
  );
};

export default UserContent;
