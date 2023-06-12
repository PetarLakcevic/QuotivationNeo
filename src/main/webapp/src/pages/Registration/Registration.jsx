import React, { useRef, useState, useEffect } from 'react';
import { registerReq, loginReq } from '../../axios/axios.js';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert, Box, Button, FormControl, TextField, Input, InputAdornment, Snackbar, Typography, FormHelperText } from '@mui/material';
import { DriveFileRenameOutline, Email, Lock, LockOpen, PermIdentity } from '@mui/icons-material';
import logo from '../../assets/images/logo.png';

const Registration = ({ setToken, parseToken }) => {
  const loginRef = useRef(null);
  const passwordRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9]|.*[!@#$%^&*()\-_=+{};:,<.>]).{6,}$/;

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  // useEffect(() => {
  //   setError(!passwordRegex.test(password));
  // }, [password]);

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();
    registerReq(
      loginRef.current.value,
      passwordRef.current.value,
      firstNameRef.current.value,
      lastNameRef.current.value,
      emailRef.current.value
    )
      .then(response => {
        loginReq(loginRef.current.value, passwordRef.current.value).then(response => {
          setToken(response.data.id_token);
          navigate('/welcome');
        });
      })
      .catch(error => {
        setMessage(error.response.data.title);
        setOpen(true);
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
          display: 'flex',
          flexDirection: 'column',
          // alignItems: 'center',
          justifyContent: 'space-evenly',
          minHeight: '100vh',
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
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              // minHeight: '100vh',
              width: 'min(100%, 300px)',
              margin: '0 auto',
              gap: '1rem',
            }}
          >
            <FormControl
              variant="standard"
              sx={{
                width: '100%',
              }}
            >
              <Input
                name="username"
                inputRef={loginRef}
                placeholder="Type your username"
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <PermIdentity />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl
              variant="standard"
              sx={{
                width: '100%',
              }}
            >
              <Input
                name="email"
                inputRef={emailRef}
                placeholder="Type your email"
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl
              variant="standard"
              sx={{
                width: '100%',
              }}
            >
              <TextField
                name="password"
                variant="standard"
                type={showPassword ? 'text' : 'password'}
                inputRef={passwordRef}
                placeholder="Type your password"
                id="input-with-icon-adornment"
                onBlur={() => setError(!passwordRegex.test(password))}
                error={error}
                onChange={e => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" onPointerDown={() => setShowPassword(!showPassword)}>
                      {showPassword ? <LockOpen /> : <Lock />}
                    </InputAdornment>
                  ),
                }}
              />
              {error && (
                <FormHelperText
                  sx={{
                    color: '#f44336',
                    fontSize: '0.75rem',
                    fontWeight: '400',
                    textAlign: 'center',
                    textShadow: '0 0 1px  #000',
                  }}
                >
                  Password must contain at least one uppercase letter, a number or special character, and be longer than 5 characters
                </FormHelperText>
              )}
            </FormControl>
            <FormControl
              variant="standard"
              sx={{
                width: '100%',
              }}
            >
              <Input
                name="firstName"
                inputRef={firstNameRef}
                placeholder="Type your first name"
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <DriveFileRenameOutline />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl
              variant="standard"
              sx={{
                width: '100%',
              }}
            >
              <Input
                name="lastName"
                inputRef={lastNameRef}
                placeholder="Type your last name"
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <DriveFileRenameOutline />
                  </InputAdornment>
                }
              />
            </FormControl>

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
              Register
            </Button>
            <Box>
              <Typography
                variant="body2"
                color="black"
                sx={{
                  display: 'flex',
                  gap: '0.5rem',
                }}
              >
                Already have an account?{' '}
                <Typography
                  variant="body2"
                  sx={{
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                  onPointerDown={() => navigate('/login')}
                >
                  Login
                </Typography>
              </Typography>
            </Box>
          </Box>
        </form>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
};

export default Registration;
