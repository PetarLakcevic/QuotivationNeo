import { Box, Typography } from '@mui/material';
import React from 'react';
import visaSecure from '../assets/images/Logotipi/Visa Secure/visa-secure_blu_72dpi.png';
import masterId from '../assets/images/Logoi/Master Secure crni.svg';
import maestro from '../assets/images/Logotipi/Maestro Card/Maestro - White and Light Backgrounds/ms_vrt_pos.svg';
import master from '../assets/images/Logoi/Mastercard black.svg';
import dina from '../assets/images/Logoi/dinacard-new.svg';
import visa from '../assets/images/Logoi/Visa New 2021.svg';
import chipcard from '../assets/images/Logotipi/ChipCard LOGO 2021_rgb.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <Box
      sx={{
        mt: 2,
        padding: '20px',
        backgroundImage: 'linear-gradient(135deg, hsl(193, 66%, 32%) 0%, hsl(144, 25%, 57%) 90% )',
        // position: 'sticky',
        // bottom: '0',
        width: '100%',
      }}
    >
      {' '}
      <Typography variant="body1" sx={{ mb: 2, textAlign: 'center' }}>
        Wermax Consulting doo | PIB 109871829 | MB 21258385
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            alignItems: 'center',
            //   justifyContent: 'flex-end',
            // justifySelf: 'flex-end',
            // justifyItems: 'flex-end',
            marginLeft: 'auto',
            gap: '3px',
          }}
        >
          {' '}
          <img
            src={visa}
            alt="visa"
            style={{
              width: '65px',
              height: '50px',
              objectFit: 'contain',
            //   backgroundColor: 'white',
              padding: '5px',
              // maxWidth: isLandscape ? '10vw' : '100%',
            }}
          />{' '}
          <img
            src={master}
            alt="master"
            style={{
              width: '65px',
              height: '50px',
              objectFit: 'contain',
            //   backgroundColor: 'white',
              padding: '5px',
              // maxWidth: isLandscape ? '10vw' : '100%',
            }}
          />
          <img
            src={maestro}
            alt="maestro"
            style={{
              width: '65px',
              height: '50px',
              objectFit: 'contain',
            //   backgroundColor: 'white',
            //   padding: '5px',
              // maxWidth: isLandscape ? '10vw' : '100%',
            }}
          />
          <img
            src={dina}
            alt="dina"
            style={{
              width: '65px',
              height: '50px',
              objectFit: 'contain',
            //   backgroundColor: 'white',
              padding: '5px',
            }}
          />
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <a href="https://chipcard.rs/ecommerce/" target="_blank" rel="noreferrer">
            <img
              src={chipcard}
              alt="chipcard"
              style={{
                width: '75px',
                height: '50px',
                objectFit: 'contain',
                // backgroundColor: 'white',
                padding: '5px',
              }}
            />
          </a>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <a href="http://www.mastercard.com/rs/consumer/credit-cards.html" target="_blank" rel="noreferrer">
            <img
              src={visaSecure}
              alt="visa secure"
              style={{
                width: '75px',
                height: '50px',
                objectFit: 'contain',
                // backgroundColor: 'white',
                padding: '5px',
              }}
            />
          </a>
          <a href="https://rs.visa.com/pay-with-visa/security-and-assistance/protected-everywhere.html " target="_blank" rel="noreferrer">
            <img
              src={masterId}
              alt="master id"
              style={{
                width: '75px',
                height: '50px',
                objectFit: 'contain',
                // backgroundColor: 'white',
                padding: '5px',
              }}
            />
          </a>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
