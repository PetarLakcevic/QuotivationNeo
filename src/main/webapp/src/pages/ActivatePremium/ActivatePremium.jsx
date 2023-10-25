import React, { useEffect, useState } from 'react';
import { paymentStatus } from '../../axios/axios';
import { useParams } from 'react-router-dom';
import UserNavbar from '../../components/UserNavbar';
import UserContainer from '../../components/UserContainer';
import { Box, CircularProgress, Fade } from '@mui/material';

const ActivatePremium = () => {
  const code = useParams().id;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    paymentStatus()
      .then(res => {
        console.log(res);
        const timer = setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  return (
    <UserContainer>
      {/* <UserNavbar /> */}
      <Box
        sx={{
          width: '100%',
          height: '70vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Fade in={loading} timeout={1000}>
          <CircularProgress
            size={80}
            sx={{
              color: 'black',
            }}
          />
        </Fade>
        <Fade in={!loading} timeout={1000}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              fontSize: '2rem',
              textAlign: 'center',
            }}
          >
            Your account has been successfully upgraded to premium!
          </Box>
        </Fade>
      </Box>
    </UserContainer>
  );
};

export default ActivatePremium;
