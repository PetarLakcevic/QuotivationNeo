import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useRef, useState, useEffect } from 'react';
import UserContainer from '../../components/UserContainer';
import UserContent from '../../components/UserContent';
import UserNavbar from '../../components/UserNavbar';
import hope from '../../assets/images/hope.jpg';
import rain from '../../assets/images/rain.jpg';
import sandColor from '../../assets/images/sandcolor.jpg';
import seapink from '../../assets/images/seapink.jpg';
import sky from '../../assets/images/sky.jpg';
import sunset from '../../assets/images/sunset.webp';
import golden from '../../assets/images/golden.jpeg';
import sandbrown from '../../assets/images/sandbrown.jpg';
import sandgray from '../../assets/images/sandgray.jpeg';
import reddoor from '../../assets/images/reddoor.webp';
import pencil from '../../assets/images/pencil.webp';
import road from '../../assets/images/road.jpeg';
import droneview from '../../assets/images/droneview.jpeg';

import { setTheme } from '../../axios/axios';
import { useNavigate } from 'react-router-dom';
const Theme = ({ account, setAccount, isLandscape }) => {
  const imageArray = [rain, sandColor, seapink, sky, sunset, golden, sandbrown, sandgray, reddoor, pencil, road, droneview];
  const [selectedIndex, setSelectedIndex] = useState(1);

  const carouselRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (account) {
      setSelectedIndex(account.userAdditionalFields?.themePicture);
    }
  }, [account]);

  const handleSubmit = () => {
    setTheme(selectedIndex).then(res => {
      setAccount(res.data);
      navigate('/home');
    });
  };

  return (
    <UserContainer>
      {/* <UserNavbar /> */}
      <UserContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          <Typography variant="h5" mt={3}>
            SELECT THEME
          </Typography>
          <Box
            mt={3}
            sx={{
              width: '100vw',
              overflowX: 'scroll',
              scrollbarWidth: 'none',
              padding: ' 1rem',
              msOverflowStyle: 'none',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
            ref={carouselRef}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection:  'row',
                justifyContent: 'space-between',
                gap: isLandscape ? 5 : 2,
                width: isLandscape ? "100vw" : `${imageArray.length * 80}%`,
                margin: '0 auto',
                flexWrap: 'wrap',
                padding: '1rem',

              }}
            >
              {imageArray.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    position: 'relative',
                    width: isLandscape ? '20vw' : `60vw`,
                    aspectRatio: '9/12',
                    borderRadius: '1rem',
                    overflow: 'hidden',
                    boxShadow: '0 0 8px 3px rgba(0, 0, 0, 0.4)',
                    margin: '0',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundImage:
                      selectedIndex === index + 1 ? 'linear-gradient(135deg, hsl(193, 66%, 32%), hsl(144, 25%, 57%), #aac0d0)' : 'none',
                    animation: selectedIndex === index + 1 ? 'gradient 5s ease infinite' : 'none',
                    backgroundSize: '400% 400%',
                    '@keyframes gradient': {
                      '0%': {
                        backgroundPosition: '0% 50%',
                      },
                      '50%': {
                        backgroundPosition: '100% 50%',
                      },
                      '100%': {
                        backgroundPosition: '0% 50%',
                      },
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: '90%',
                      aspectRatio: '9/12',
                      borderRadius: '5px',
                      margin: '0 auto',
                      overflow: 'hidden',
                    }}
                    onPointerDown={e => {
                      setSelectedIndex(index + 1);
                    }}
                  >
                    <img
                      style={{
                        width: '100%',
                        borderRadius: '5px',
                        // boxShadow: '0 0 8px 3px rgba(0, 0, 0, 0.4)',
                      }}
                      src={image}
                      alt="hope"
                    />
                    <Box
                      sx={{
                        boxShadow: 'inset 6px 8px 10px 1px rgba(0,0,0,0.35)',
                        width: '90%',
                        height: '90%',
                        position: 'absolute',
                        borderRadius: '5px',

                        top: 14,
                        zIndex: 1,
                      }}
                    ></Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
             
          <Button variant="outlined" sx={{ mt: 3,  borderColor: '#478D8A',  color: '#478D8A',
              mt: '2rem', }} onPointerDown={handleSubmit}>
            <Typography variant="h6">SAVE</Typography>
          </Button>
        </Box>
      </UserContent>
    </UserContainer>
  );
};

export default Theme;
