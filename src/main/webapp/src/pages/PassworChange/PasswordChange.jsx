import { Box, Typography, Container, FormControl, Input, Button, TextField, InputAdornment, FormHelperText } from '@mui/material';
import logo from '../../assets/images/logo.png';
import React, { useRef, useState } from 'react';
import { finishResetPasswordReq, loginReq } from '../../axios/axios';
import { AccountCircle, Lock, LockOpen } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

const PasswordChange = ({ setToken, parseToken }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const key = searchParams.get('key');
  const navigate = useNavigate();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9]|.*[!@#$%^&*()\-_=+{};:,<.>]).{6,}$/;
  const handleSubmit = event => {
    event.preventDefault();
    if (!passwordRegex.test(password)) {
      setError(true);
      return;
    }
    finishResetPasswordReq(key, passwordRef.current.value)
      .then(response => {
        navigate('/login');
      })
      .catch(err => console.log(err));
  };
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'linear-gradient(135deg, hsl(193, 66%, 32%), hsl(144, 25%, 57%), #aac0d0)',
        color: 'black',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
      }}
    >
      <Container maxWidth="sm">
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
        <Typography variant="h6" sx={{ textAlign: 'center', color: 'black', width: '90%', marginBottom: '1rem', marginInline: 'auto' }}>
          Enter your new password below.
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: 'min(100vw, 300px)',
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
              <TextField
                name="password"
                variant="standard"
                type={showPassword ? 'text' : 'password'}
                inputRef={passwordRef}
                placeholder="Type your password"
                id="input-with-icon-adornmentP"
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
            <Button
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
              type="submit"
            >
              Submit code
            </Button>
          </Box>
        </form>
      </Container>
    </Box>
  );
};

export default PasswordChange;
