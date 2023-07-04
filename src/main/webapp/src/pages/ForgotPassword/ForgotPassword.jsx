import React, { useRef, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { Box, Button, FormControl, FormHelperText, Input, InputAdornment, Typography, createTheme } from '@mui/material';
import logo from '../../assets/images/logo.png';
import { Email, PermIdentity } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { resetPasswordReq } from '../../axios/axios';

const ForgotPassword = () => {
  const [emailError, setEmailError] = useState(false);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const emailRef = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();
    if (!emailRegex.test(emailRef.current.value)) {
      setEmailError(true);
      return;
    }
    if (emailRef.current.value === '') return;
    console.log(emailRef.current.value);
    resetPasswordReq(emailRef.current.value)
      .then(res => {
        // console.log(res);
        navigate('/check-email');
      })
      .catch(err => console.log(err));
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

        <Typography variant="body1" sx={{ textAlign: 'center', color: 'black', width: '90%', marginBottom: '1rem', marginInline: 'auto' }}>
          Enter your email address and we'll send you a link to reset your password.
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
                id="input-with-icon-adornment"
                placeholder="Type your email"
                aria-label="email"
                inputRef={emailRef}
                error={emailError}
                onChange={() => setEmailError(false)}
                onBlur={() => {
                  if (!emailRegex.test(emailRef.current.value)) {
                    setEmailError(true);
                  }
                }}
                sx={{
                  color: 'white',
                }}
                startAdornment={
                  <InputAdornment position="start" inputRef={emailRef} id="email">
                    <Email />
                  </InputAdornment>
                }
              />
              {emailError && (
                <FormHelperText
                  sx={{
                    color: '#f44336',
                    fontSize: '0.75rem',
                    fontWeight: '400',
                    textAlign: 'center',
                    textShadow: '0 0 1px  #000',
                  }}
                >
                  Please enter a valid email address
                </FormHelperText>
              )}
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
              onPointerDown={() => navigate('/login')}
            >
              Back to login
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
            <Typography variant="body2" color="black">
              New user?{' '}
              <Typography
                variant="body2"
                color="black"
                component="a"
                onPointerDown={() => navigate('/register')}
                sx={{
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
              >
                Register here.
              </Typography>
            </Typography>
          </Box>
        </form>
      </Box>
    </ThemeProvider>
  );
};

export default ForgotPassword;
