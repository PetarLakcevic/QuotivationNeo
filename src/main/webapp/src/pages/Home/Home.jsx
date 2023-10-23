import React, { useEffect, useState } from 'react';
import UserContainer from '../../components/UserContainer';
import UserNavbar from '../../components/UserNavbar';
import UserContent from '../../components/UserContent';
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import qq from '../../assets/images/qq.png';
import logo from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const navigate = useNavigate();
  return (
    <UserContainer>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1rem',
          backgroundImage: 'linear-gradient(135deg, hsl(193, 66%, 32%) 0%, hsl(144, 25%, 57%) 90% )',
          boxShadow: '-1px 2px 10px 1px rgba(0, 0, 0, 0.4)',
          position: 'relative',
          zIndex: 1,
          width: '100%',
        }}
      >
        <img src={qq} alt="logo" style={{ width: '100px', height: '100px' }} />
      </Box>
      <UserContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            maxWidth: '1260px',
            margin: '0 auto',
            textAlign: 'center',
            gap: '1rem',
            mt: '2rem',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: 'min(100vw, 300px)',
              mb: '1rem',
            }}
          >
            <img
              src={logo}
              alt="logo"
              style={{
                width: '6rem',
              }}
            />
            <Typography variant="h5" sx={{ textAlign: 'center', color: 'black', marginLeft: '-0.6rem', fontWeight: 'bold' }}>
              uotivation
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: matches ? 'row' : 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              gap: matches ? '3rem' : '2rem',
              width: '100%',
              mt: '2rem',
              mb: '2rem',
            }}
          >
            <Box
              sx={{
                width: matches ? '36%' : '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <Typography variant="h4">Our mission</Typography>
              <Typography
                variant="h6"
                sx={{
                  mt: 3,
                  textAlign: 'justify',
                }}
              >
                Every day, we face challenges that test our limits, push our boundaries, and sometimes shake our beliefs. In these moments,
                the right words can be a beacon of hope, a nudge of encouragement, or a spark of inspiration.
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mt: 5,
                  textAlign: 'justify',
                }}
              >
                At Quotivation, we understand the profound impact that a well-timed quote can have on one's day, outlook, and life. That's
                why we've crafted an app tailored to serve you personalized quotes, categorized to fit every mood, moment, and milestone.
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mt: 5,
                  textAlign: 'justify',
                }}
              >
                Whether you're seeking motivation for your next big endeavor, solace during trying times, or just a splash of positivity in
                your day – we've got a quote for that.
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mt: 8,
                  textAlign: 'justify',
                }}
              >
                Dive in, and let the words guide, uplift, and motivate you. Experience the transformative power of quotes today, only on
                Quotivation!
              </Typography>
            </Box>
            <Box
              sx={{
                width: matches ? '64%' : '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box>
                <Typography variant="h4">Plans</Typography>
                <Typography
                  variant="h6"
                  sx={{
                    mt: 3,
                    textAlign: 'justify',
                  }}
                >
                  <b>Explore Plan (Free)</b> : Embark on a journey of inspiration with our free Explore Plan. For the first week, receive a
                  boost of motivation with 2 daily quotes. After that, continue your journey with a special quote every 3 days, reminding
                  you of the power within. Register to use this option for free!
                </Typography>
                <Typography variant="h6" sx={{ mt: 1, textAlign: 'justify' }}>
                  <b> Premium Plan (Paid)</b> : Elevate your daily dose of motivation with our Premium Plan. For an annual subscription,
                  enjoy 2 inspirational quotes every single day, ensuring you're constantly fueled with positivity. Plus, with exclusive
                  access to your personal quote history, you'll never lose track of those words that resonated with you the most. Register
                  and unlock the premium plan for 2.000 RSD (approx. 17.2 EUR)
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'stretch',
                  justifyContent: 'space-between',
                  width: '100%',
                  gap: 2,
                  mt: 2,
                }}
              >
                <Box
                  sx={{
                    width: '50%',
                    border: '1px solid #478D8A',
                    borderRadius: '5px',

                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Box
                    sx={{
                      p: 1,
                      py: 4.5,
                      // bgcolor: '#478D8A',
                      // color: '#fff',
                      borderBottomLeftRadius: '10px',
                      borderBottomRightRadius: '10px',
                    }}
                  >
                    <Typography variant="h5">Explore plan</Typography>
                  </Box>
                  <Box
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: 2,
                      p: 2,
                      mt: 1,
                    }}
                  >
                    <Box>
                      <Typography variant="body1">-2 quotes a day for the first 7 days</Typography>
                      <Typography>-1 quote every 3 days after the first 7 days expire</Typography>
                      <Typography>-Daily notifications</Typography>
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: '50%',
                    border: '1px solid #478D8A',
                    borderRadius: '5px',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Box
                    sx={{
                      p: 4.5,
                      bgcolor: '#478D8A',
                      color: '#fff',
                      borderBottomLeftRadius: '10px',
                      borderBottomRightRadius: '10px',
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: '500',
                      }}
                    >
                      Premium plan
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: 2,
                      p: 2,
                      mt: 1,
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                      }}
                    >
                      <Typography>- 2 quotes a day for an entire year (365 days)</Typography>
                      <Typography>- Daily notifications</Typography>{' '}
                      <Typography>- Access to History (see the list of your previously received quotes)</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>{' '}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  gap: '1rem',
                  mt: matches ? '2rem' : '2rem',
                  // position: 'fixed',
                  // bottom: 50,
                  // left: '0',
                  // right: '0',
                }}
              >
                <Button
                  size="large"
                  variant="outlined"
                  sx={{
                    //   marginInline: 'auto',
                    bgcolor: '#478D8A',
                    color: '#fff',
                    // hover 
                    '&:hover': {
                      bgcolor: '#478D8Ad5',
                      color: '#fff',
                    },
                  }}
                  onPointerDown={() => navigate('Login')}
                  // disabled={!agree}
                >
                  {' '}
                  <Typography variant="h5">Register now</Typography>
                </Button>
                <Typography variant="body1" color="black">
                  Already a member?{' '}
                  <Typography
                    variant="body1"
                    color="black"
                    component="a"
                    onPointerDown={() => navigate('/login')}
                    sx={{
                      textDecoration: 'underline',
                      cursor: 'pointer',
                    }}
                  >
                    Login here.
                  </Typography>
                </Typography>
              </Box>
            </Box>
          </Box>{' '}
        </Box>
      </UserContent>
    </UserContainer>
  );
};

export default Home;
