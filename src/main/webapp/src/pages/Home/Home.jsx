import React, { useEffect, useRef, useState } from 'react';
import UserContainer from '../../components/UserContainer';
import UserNavbar from '../../components/UserNavbar';
import UserContent from '../../components/UserContent';
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import qq from '../../assets/images/qq.png';
import logo from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
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
import galaxy from '../../assets/images/galaxy.jpeg';
import skyline from '../../assets/images/skyline.jpg';
import autumn from '../../assets/images/autumn.jpeg';
import leafs from '../../assets/images/3.webp';
import bird from '../../assets/images/9.jpg';
import midnight from '../../assets/images/2.jpeg';
import { ArrowDownward, Menu, Sort } from '@mui/icons-material';
import SlideLeft from '../../components/SlideLeft';
import Footer from '../../components/Footer';

const Home = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const navigate = useNavigate();

  const backgorunds = [leafs, bird, midnight];
  const quotes = [
    {
      quote: 'Our greatest glory is not in never falling, but in rising every time we fall',
      author: 'Confucius',
    },
    {
      quote: 'The future belongs to those who believe in the beauty of their dreams.',
      author: 'Eleanor Roosevelt',
    },
    {
      quote: 'What lies behind us and what lies before us are tiny matters compared to what lies within us.',
      author: 'Ralph Waldo Emerson',
    },
  ];

  const [phase, setPhase] = useState(0);

  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase(phase => (phase + 1) % backgorunds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setQuote(quotes[phase]);
  }, [phase]);

  const [isFooterVisible, setFooterVisibility] = useState(false);

  // Ref za footer
  const footerRef = useRef(null);

  useEffect(() => {
    const checkFooterVisibility = () => {
      const rect = footerRef?.current?.getBoundingClientRect();
      console.log(rect.top);
      console.log(window.innerHeight);
      if (rect.top >= 0 && rect.top <= window.innerHeight) {
        setFooterVisibility(true);
      } else {
        setFooterVisibility(false);
      }
    };

    // Prati skrolovanje
    window.addEventListener('scroll', checkFooterVisibility);

    // Početna provera
    checkFooterVisibility();

    return () => {
      // Uklonite event listener kada se komponenta unmount-uje
      window.removeEventListener('scroll', checkFooterVisibility);
    };
  }, []);

  useEffect(() => {
    console.log(isFooterVisible);
  }, [isFooterVisible]);

  return (
    <UserContainer>
      {backgorunds.map((background, index) => (
        <Box
          key={index}
          sx={{
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            zIndex: '0',
            opacity: phase === index ? '1' : '0',
            transition: 'opacity 1s ease-in-out',
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      ))}
      <Box
        sx={{
          position: 'relative',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            // maxWidth: '940px',
            width: 'min(90vw, 940px)',
            margin: '0 auto',
            textAlign: 'center',
            gap: '1rem',
            mt: '5rem',
            p: '3rem',
            position: 'relative',
            zIndex: '2',
            backgroundColor: 'rgba(255,255,255,0.4)',
            backdropFilter: 'blur(10px)',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(0,0,0,0.5)',
            color: 'black',
            textShadow: '0 0 1px rgba(255,255,255,0)',
            // fontWeight: '900 !important',
            //text stroke
            // WebkitTextStroke: '0.5px #ccc',
          }}
        >
          <Box>
            <Typography variant="h4" color="black">
              {quote.quote}
            </Typography>
            <Typography
              variant="h5"
              // color="white"
              sx={{
                fontStyle: 'italic',
                mt: 1,
              }}
            >
              {quote.author}
            </Typography>
          </Box>{' '}
          <Typography
            variant="h6"
            sx={{
              mt: 3,
              textAlign: 'center',
            }}
            // color="white"
          >
            Every day, we face challenges that test our limits, push our boundaries, and sometimes shake our beliefs. In these moments, the
            right words can be a beacon of hope, a nudge of encouragement, or a spark of inspiration.
          </Typography>
          <Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: matches ? 'row' : 'column',
                alignItems: 'stretch',
                justifyContent: 'space-between',
                width: '100%',
                gap: 2,
                mt: 2,
              }}
            >
              <Box
                sx={{
                  width: matches ? '50%' : '100%',
                  border: '1px solid #fff',
                  borderRadius: '5px',

                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box
                  sx={{
                    p: 1,
                    py: 4.5,
                    borderBottomLeftRadius: '10px',
                    borderBottomRightRadius: '10px',
                  }}
                  // color="white"
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
                  // color="white"
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
                  width: matches ? '50%' : '100%',
                  border: '1px solid #fff',
                  borderRadius: '5px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box
                  sx={{
                    p: 4.5,
                    bgcolor: '#fff',
                    color: '#000',
                    borderBottomLeftRadius: '10px',
                    borderBottomRightRadius: '10px',
                  }}
                  color="white"
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
                    // color="white"
                  >
                    <Typography>- 2 quotes a day for an entire year (365 days)</Typography>
                    <Typography>- Daily notifications</Typography>{' '}
                    <Typography>- Access to History (see the list of your previously received quotes)</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Typography
              variant="h6"
              // color="white"
              mt={2}
            >
              All details you can find in our{' '}
              <Typography
                variant="h6"
                // color="white"
                component="a"
                onPointerDown={() => navigate('/terms-&-conditions')}
                sx={{
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  color: '#478D8A',
                  textShadow: '0 0 5px  rgba(0,0,0,0)',
                }}
              >
                terms and conditions page
              </Typography>
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              gap: '1rem',
            }}
          >
            <Button
              size="large"
              variant="outlined"
              sx={{
                bgcolor: '#fff',
                color: '#000',
                '&:hover': {
                  bgcolor: '#fff',
                  color: '#000',
                },
              }}
              onPointerDown={() => navigate('/register')}
            >
              <Typography variant="h5">Register now</Typography>
            </Button>
            <Typography variant="h6" >
              Already a member?{' '}
              <Typography
                variant="h6"
                color="white"
                component="a"
                onPointerDown={() => navigate('/login')}
                sx={{
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  color: '#478D8A',
                  textShadow: '0 0 5px  rgba(0,0,0,0)',
                }}
              >
                Login here.
              </Typography>
            </Typography>
          </Box>
        </Box>
        <ArrowDownward
          sx={{
            // color: 'white',
            cursor: 'pointer',
            position: 'fixed',
            bottom: '2rem',
            right: '1rem',
            zIndex: '999',
            transform: isFooterVisible ? 'scale(0)' : 'scale(1)',
            transition: 'transform 0.3s ease-in-out',
          }}
          onClick={() => footerRef.current.scrollIntoView({ behavior: 'smooth' })}
        />

        <Box
          sx={{
            mt: 10,
          }}
          ref={footerRef}
        >
          <Footer />
        </Box>
      </Box>
    </UserContainer>
  );
};

export default Home;
