import React, { useRef } from 'react';
import { Box, Button, FormControl, Input, InputAdornment, ThemeProvider, Typography, createTheme } from '@mui/material';
import logo from '../../assets/images/logo.png';
import { Code, Source } from '@mui/icons-material';
import { activateAccountReq } from '../../axios/axios';

const ActivateAccount = () => {
  const codeRef = useRef(null);

  const handleSubmit = event => {
    event.preventDefault();
    activateAccountReq(codeRef.current.value)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
    components: {
      MuiInput: {
        styleOverrides: {
          root: {
            color: 'white',
            '& .MuiInputAdornment-root .MuiSvgIcon-root': {
              color: 'white',
            },
            '& .MuiInput-underline:before': {
              borderBottomColor: 'white',
            },
            '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
              borderBottomColor: 'white',
            },
            '& .MuiInput-underline:after': {
              borderBottomColor: 'white',
            },
          },
        },
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'linear-gradient(135deg, hsl(193, 66%, 32%), hsl(144, 25%, 57%), #aac0d0)',
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
          <Typography variant="h5" sx={{ textAlign: 'center', color: 'black', marginLeft: '-0.3rem' }}>
            uotivation
          </Typography>
        </Box>
        <Typography variant="h5" sx={{ textAlign: 'center', color: 'black', marginBottom: '1rem' }}>
          Activate your account
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center', color: 'black', width: '90%', marginBottom: '1rem', marginInline: 'auto' }}>
          Please check your email for the activation code and enter it below.
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              // minHeight: '100vh',
              width: 'min(100vw, 300px)',
              margin: '0 auto',
              gap: '1rem',
            }}
          >
            <FormControl
              variant="standard"
              sx={{
                width: '100%',
                marginTop: '2rem',
              }}
            >
              <Input
                id="input-with-icon-adornmentA"
                placeholder="Type your code"
                aria-label="code"
                inputRef={codeRef}
                sx={{
                  color: 'white',
                }}
                startAdornment={
                  <InputAdornment position="start" inputRef={codeRef} id="code">
                    <Source />
                  </InputAdornment>
                }
              />
            </FormControl>
            <Typography
              variant="body2"
              color="black"
              sx={{
                marginLeft: 'auto',
                textDecoration: 'underline',
                fontStyle: 'italic',
                cursor: 'pointer',
              }}
              onPointerDown={() => console.log('Back to login')}
            >
              Didn't receive the code? Get a new one.
            </Typography>
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: '100%',
                backgroundColor: 'rgb(255, 255, 255, 0.2)',
                elevation: 0,
                borderRadius: '1rem',
                border: '1px solid white',
                boxShadow: 'none',
                color: 'white',
                marginTop: '1rem',
              }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </ThemeProvider>
  );
};

export default ActivateAccount;
