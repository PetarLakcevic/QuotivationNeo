import React from 'react';
import UserContainer from '../../components/UserContainer';
import UserNavbar from '../../components/UserNavbar';
import UserContent from '../../components/UserContent';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TermsModal from './TermsModal';

const Step2 = () => {
  const navigate = useNavigate();
  return (

      <UserContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: 3,
            textAlign: 'center',
            textDecoration: 'none',
            maxWidth: '760px',
            margin: '0 auto',
          }}
        >
          <TermsModal />
        
        </Box>
      </UserContent>

  );
};

export default Step2;
