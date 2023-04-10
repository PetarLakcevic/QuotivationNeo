import { Box } from '@mui/system';
import React from 'react';

const Header = ({children}) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '75px',
        borderRadius: '1rem',
        // backgroundImage: 'linear-gradient(115deg, rgba(245, 247, 250, 0.9) 0%, rgba(195, 207, 226,  0.8) 74%)',
        //  boxShadow: '0px 3px 10px 1px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'all 1s ease-in-out !important',
        cursor: 'pointer',
        whiteSpace: 'pre-line',
        padding: 0, // set padding to 0
        // translate: '-50% -50%',
        textTransform: 'capitalize',
        textAlign: 'center',
              fontSize: '1.5rem',
        top: '2%',

      }}
      // elevation={10}
    >
      {children}
    </Box>
  );
};

const setOnTop = () => {
  const x = 50;
  const y = 2;
  return {
    left: `${x}%`,
    top: `${y}%`,
    translate: `-${x}% 0%`,
  };
};

export default Header;
