import React, { useEffect, useState } from 'react';
import UserContainer from '../../components/UserContainer';
import UserContent from '../../components/UserContent';
import UserNavbar from '../../components/UserNavbar';
import { getCurrentQuote, getHistory } from '../../axios/axios';
import hope from '../../assets/images/hope.jpg';
import rain from '../../assets/images/rain.jpg';
import sandColor from '../../assets/images/sandcolor.jpg';
import seapink from '../../assets/images/seapink.jpg';
import sky from '../../assets/images/sky.jpg';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

const Quote = ({ account }) => {
  const token = localStorage.getItem('token');
  const imageArray = [hope, rain, sandColor, seapink, sky];
  const [quote, setQuote] = useState({});

  useEffect(() => {
    getCurrentQuote(token).then(res => {
      setQuote(res.data);
      console.log(res.data);
    });
  }, []);
  return (
    <>
      <Box sx={{
        position: 'absolute',
        width: '100%',
      }}>
        <UserNavbar home={true} /> </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100vw',
          height: '100vh',
          backgroundImage: `url(${imageArray[account?.userAdditionalFields?.themePicture - 1]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            width: '100%',
            // aspectRatio: '9/12',
            // borderRadius: '5px',
            margin: '0 auto',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: 'white',
                textShadow:
                  '0 0 4px rgba(0,0,0,0.6), 0 4px 8px rgba(0,0,0,0.9), 0 16px 24px rgba(0,0,0,0.4), 0 32px 48px rgba(0,0,0,0.7)',
                textAlign: 'center',
                width: '100%',
                // wordBreak: 'break-all',
              }}
            >
            {quote?.text}
                {/*   {quote.text}
                {quote.text}
                {quote.text}
                {quote.text}
                {quote.text}
                {quote.text}
                {quote.text} */}
              {/* Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates nisi consequatur laudantium vitae! Voluptatem nam autem illum, veritatis, recusandae eveniet id voluptates fugiat dolorum voluptatibus officiis soluta fuga sint? Natus. */}
            </Typography>
          </Box>
          <Box
            sx={{
              position: 'absolute',
              bottom: '0%',
              right: '0%',
              transform: 'translate(-20%, -50%)',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: 'white',
                textShadow:
                  '0 0 4px rgba(0,0,0,0.6), 0 4px 8px rgba(0,0,0,0.5), 0 16px 24px rgba(0,0,0,0.4), 0 32px 48px rgba(0,0,0,0.3)',
                textAlign: 'center',
                width: '100%',
                wordBreak: 'break-all',
                fontStyle: 'italic',
              }}
            >
             {quote?.author?.name} 
              {/* Author */}
            </Typography>
          </Box>
        </Box>

      </Box>
      {/* </UserContent> */}
    </>
  );
};

export default Quote;
