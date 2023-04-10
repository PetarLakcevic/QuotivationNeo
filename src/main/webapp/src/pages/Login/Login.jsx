import React, { useRef, useState } from 'react';
import { loginReq } from '../../axios/axios.js';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Input,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff, AccountCircle, PermIdentity, Lock, LockOpen } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GoogleLogin, GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import logo from '../../assets/images/logo.png';

const Login = ({ setToken, parseToken }) => {
  const userNameRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    loginReq(userNameRef.current.value, passwordRef.current.value)
      .then(response => {
        setToken(response.data.id_token);
        if (parseToken(response.data.id_token).auth.includes('ROLE_ADMIN')) {
          navigate('/adminpanel');
        } else {
          navigate('/home');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleGoogleResponse = async response => {
    await axios
      .post('https://oauth2.googleapis.com/token', {
        code: response.code,
        client_id: '230834961464-it87cplru84s90ih3blbh1c9fkhdao90.apps.googleusercontent.com',
        client_secret: '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',
        grant_type: 'authorization_code',
    redirect_uri: 'http://localhost:5173',

      })
      .then(response => {
        console.log(response);
        console.log(parseToken(response.data.id_token));
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: response => {
      console.log(response);
      handleGoogleResponse(response);
    },
    onFailure: response => {
      console.log(response);
    },
    flow: 'popup',
    clientId: '1000000000000-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com',
  });

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
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width: 'min(100vw, 300px)',
          mb: '1rem',
        }}>
          <img src={logo} alt="logo" style={{
            width: '6rem',
            
          }}/>
          <Typography variant="h5" sx={{ textAlign: 'center', color: 'black', marginLeft: '-0.3rem' }}>
            uotivation
          </Typography>
        </Box>
        <Typography variant="h5" sx={{ textAlign: 'center', color: 'black', margin: '1rem' }}>
          WELCOME
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
                placeholder="Type your username"
                aria-label="username"
                inputRef={userNameRef}
                sx={{
                  color: 'white',
                }}
                startAdornment={
                  <InputAdornment position="start" inputRef={userNameRef} id="username">
                    <PermIdentity />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl
              variant="standard"
              sx={{
                width: '100%',
                marginTop: '2rem',
              }}
            >
              <Input
                id="input-with-icon-adornment"
                placeholder="Type your password"
                aria-label="password"
                inputRef={passwordRef}
                startAdornment={
                  <InputAdornment
                    position="start"
                    inputRef={passwordRef}
                    id="password"
                    onPointerDown={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <LockOpen /> : <Lock />}
                  </InputAdornment>
                }
                type={showPassword ? 'text' : 'password'}
              />
            </FormControl>
            <Typography
              variant="body2"
              color="black"
              sx={{
                marginLeft: 'auto',
                textDecoration: 'underline',
                fontStyle: 'italic',
              }}
            >
              Forgot password?{' '}
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
              Login
            </Button>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '1px',
                  backgroundColor: 'black',
                }}
              />
              <Typography
                variant="body2"
                color="black"
                sx={{
                  whiteSpace: 'nowrap',
                }}
              >
                Or Sign Up using
              </Typography>
              <Box
                sx={{
                  width: '100%',
                  height: '1px',
                  backgroundColor: 'black',
                }}
              />
            </Box>
            <Button onPointerDown={handleGoogleLogin}>
              <AccountCircle />
              <Typography variant="body2" color="black">
                Google
              </Typography>
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

export default Login;
