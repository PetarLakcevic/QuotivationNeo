import { ArrowBack, Sort } from '@mui/icons-material';
import { Box, Button, Modal, Typography } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import qq from '../assets/images/qq.png';
import DialogStyled from './DialogStyled';
import SlideLeft from './SlideLeft';
import { useNavigate, useLocation } from 'react-router-dom';
import crown from '../assets/images/crown.png';
import { accountReq } from '../axios/axios';

const UserNavbar = ({ home }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [account, setAccount] = useState(null);
  const [firstTimeModal, setFirstTimeModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [previousPath, setPreviousPath] = useState('');
  const currentPathRef = useRef(location.pathname);

  useEffect(() => {
    accountReq().then(res => {
      setAccount(res.data);
      // console.log(res.data);
    });
  }, []);

  // useEffect(() => {
  //   if (account?.firstTimePremium) {
  //     setFirstTimeModal(true);
  //   }
  // }, [account]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    setOpenMenu(false);
    window.location.reload();
  };

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (currentPathRef.current !== location.pathname) {
      setPreviousPath(currentPathRef.current);
      currentPathRef.current = location.pathname;
    }
  }, [location.pathname]);

  const parseToken = t => {
    return JSON.parse(atob(t.split('.')[1]));
  };

  const token = localStorage.getItem('token');

  const user = parseToken(token);

  useEffect(() => {
    console.log(user.auth);
  }, [user]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        backgroundImage: home ? ' ' : 'linear-gradient(135deg, hsl(193, 66%, 32%) 0%, hsl(144, 25%, 57%) 90% )',
        boxShadow: home ? ' ' : '-1px 2px 10px 1px rgba(0, 0, 0, 0.4)',
        position: 'relative',
        zIndex: 1,
        width: '100%',
      }}
    >
      {/* <Modal open={firstTimeModal} onClose={() => setFirstTimeModal(false)}>
        <Box
          sx={{
            width: '90vw',
            height: '90vh',
            backgroundColor: 'white',
            borderRadius: '10px',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: 'black',
            }}
          >
            Congratulations!
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: 'black',
            }}
          >
            Your Premium Membership is Now Active.
          </Typography>
          <Button
            variant="contained"
            sx={{
              mt: 2,
              marginInline: 'auto',
              bgcolor: '#478D8A',
            }}
            onPointerDown={() => {
              setFirstTimeModal(false);
              // navigate('/premium');
            }}
          >
            Continue
          </Button>
        </Box>
      </Modal> */}
       <img
          src={crown}
          alt="qq"
          style={{
            // width: '50%',
            maxHeight: '2rem',
            objectFit: 'contain',
            opacity: account?.hasPremium ? 1 : 0,
          }}
        />
      <ArrowBack
        sx={{
          color: 'white',
          filter: 'drop-shadow(0 0 1rem black)',
          opacity: previousPath.length === 0 || previousPath === '/login' ? 0 : 1,
          cursor: previousPath.length === 0 || previousPath === '/login' ? 'default' : 'pointer',
          transition: 'all 0.3s ease',
        }}
        onPointerDown={previousPath.length === 0 || previousPath === '/login' ? null : goBack}
      />
      {!home && (
        <img
          src={qq}
          alt="qq"
          style={{
            width: '50%',
            maxHeight: '5rem',
            objectFit: 'contain',
          }}
        />
      )}
      <Sort
        sx={{
          transform: 'scaleX(-1)',
          color: 'white',
          cursor: 'pointer',
        }}
        onPointerDown={() => setOpenMenu(true)}
      />
      <SlideLeft open={openMenu} onClose={() => setOpenMenu(false)}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            minHeight: '100vh',
            padding: '2rem',
            backgroundImage: 'linear-gradient(135deg, hsl(193, 66%, 32%), hsl(144, 25%, 57%), #aac0d0)',
            gap: '1rem',
            position: 'relative',
            top: 0,
            left: 0,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '0.5rem',
            }}
          >
            {user.auth.includes('ROLE_ADMIN') ? (
              <>
                <Button
                  onPointerDown={() => {
                    navigate('/adminpanel');
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'white',
                    }}
                  >
                    Admin Panel
                  </Typography>
                </Button>
                <Button
                  onPointerDown={() => {
                    navigate('/adminpanel/quotes');
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'white',
                    }}
                  >
                    Quotes
                  </Typography>
                </Button>
                <Button
                  onPointerDown={() => {
                    navigate('/adminpanel/authors');
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'white',
                    }}
                  >
                    Authors
                  </Typography>
                </Button>
                <Button
                  onPointerDown={() => {
                    navigate('/adminpanel/categories');
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'white',
                    }}
                  >
                    Categories
                  </Typography>
                </Button>
                <Button
                  onPointerDown={() => {
                    navigate('/adminpanel/quote_suggestions');
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'white',
                    }}
                  >
                    Quote Suggestions
                  </Typography>
                </Button>
                <Button
                  onPointerDown={() => {
                    navigate('/adminpanel/users');
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'white',
                    }}
                  >
                    Users
                  </Typography>
                </Button>
              </>
            ) : (
              <>
                <Button
                  onPointerDown={() => {
                    navigate('/home');
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'white',
                    }}
                  >
                    Home
                  </Typography>
                </Button>
                <Button
                  onPointerDown={() => {
                    navigate('/history');
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'white',
                    }}
                  >
                    History
                  </Typography>
                </Button>
                <Button
                  onPointerDown={() => {
                    navigate('/category');
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'white',
                    }}
                  >
                    Category
                  </Typography>
                </Button>
                <Button
                  onPointerDown={() => {
                    navigate('/theme');
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'white',
                    }}
                  >
                    Theme
                  </Typography>
                </Button>{' '}
                <Button
                  onPointerDown={() => {
                    navigate('/suggestions');
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'white',
                    }}
                  >
                    Suggestions
                  </Typography>
                </Button>
                <Button
                  onPointerDown={() => {
                    navigate('/privacy');
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'white',
                    }}
                  >
                    Privacy Policy
                  </Typography>
                </Button>
                <Button
                  onPointerDown={() => {
                    navigate('/terms-&-conditions');
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'white',
                    }}
                  >
                    Terms & Conditions
                  </Typography>
                </Button>
                <Button
                  onPointerDown={() => {
                    navigate('/contact');
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'white',
                    }}
                  >
                    Contact us
                  </Typography>
                </Button>
                {!account?.hasPremium && (
                  <Button
                    onPointerDown={() => {
                      navigate('/premium');
                    }}
                  >
                    {' '}
                    <img
                      src={crown}
                      alt="crown"
                      style={{
                        width: '1.5rem',
                        height: '1.5rem',
                        objectFit: 'contain',
                        marginRight: '0.5rem',
                      }}
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        color: 'white',
                      }}
                    >
                      Premium subscription
                    </Typography>
                  </Button>
                )}
              </>
            )}
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {!user.auth.includes('ROLE_ADMIN') && (
              <Button
                onPointerDown={() => {
                  navigate('/profile');
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: 'white',
                  }}
                >
                  Profile
                </Typography>
              </Button>
            )}

            <Button onPointerDown={handleLogout}>
              {' '}
              <Typography
                variant="h6"
                sx={{
                  color: 'white',
                }}
              >
                Logout
              </Typography>
            </Button>
          </Box>
        </Box>
      </SlideLeft>
    </Box>
  );
};

export default UserNavbar;
