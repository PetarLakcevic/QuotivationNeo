import { ArrowBackIos, Backspace, Logout, Menu } from '@mui/icons-material';
import { Button, Dialog, Fade, IconButton, Slide, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const Navbar = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [fade, setFade] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const goBack = () => {
    navigate(-1);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
      setOpenMenu(false);
      window.location.reload();
  };

  useEffect(() => {
    // set title to current page location
    setTitle(window.location.pathname.split('/')[window.location.pathname.split('/').length - 1]);
    console.log(window.location.pathname.split('/').length - 1);

    if (window.location.pathname.split('/')[window.location.pathname.split('/').length - 1] === 'adminpanel') {
      setFade(false);
    } else {
      setFade(true);
    }
  }, [window.location.pathname]);
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1rem',
        height: '3rem',
        position: 'sticky',
        top: 0,
        backdropFilter: 'blur(3px)',
      }}
    >
      {' '}
      <Fade in={fade} timeout={300}>
        <IconButton onClick={goBack}>
          <ArrowBackIos />
        </IconButton>
      </Fade>
      {/* <Typography
        variant="h5"
        sx={{
          textTransform: 'capitalize',
        }}
      >
        {title.replace('_', ' ')}
      </Typography> */}
      <IconButton onPointerDown={() => setOpenMenu(true)}>
        <Menu />
      </IconButton>
      <Dialog
        m={0}
        open={openMenu}
        onClose={() => setOpenMenu(false)}
        TransitionComponent={Transition}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          width: '100vw',
          height: '100vh',
          margin: '0 !important',

          backdropFilter: 'blur(3px)',
          '& .MuiDialog-paper': {
            margin: '0 !important',
            width: '50vw',
            height: '100vh !important',
            maxHeight: '100vh !important',
          },
        }}
      >
        <Box
          sx={{
            width: '50vw',
            height: '100vh',
            backgroundImage: 'linear-gradient(135deg, hsl(193, 66%, 32%), hsl(144, 25%, 57%), #aac0d0)',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            padding: '1rem',
          }}
        >
          <Button
            startIcon={<Logout />}
            variant="contained"
            sx={{ width: '100%', backgroundColor: '#FFFBD6', color: '#000', borderRadius: '30px' }}
            onPointerDown={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
};

export default Navbar;
