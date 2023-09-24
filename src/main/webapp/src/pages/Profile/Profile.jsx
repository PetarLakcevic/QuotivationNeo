import { Alert, Avatar, Button, IconButton, InputAdornment, Snackbar, TextField, Typography } from '@mui/material';
import { Box, padding } from '@mui/system';
import React, { useRef, useState } from 'react';
import UserContainer from '../../components/UserContainer';
import UserContent from '../../components/UserContent';
import UserNavbar from '../../components/UserNavbar';
import SlideUp from '../../components/SlideUp';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { changePasswordReq } from '../../axios/axios';
import logo from '../../assets/images/logo.png';

const Profile = ({ account }) => {
  const [changePassDialog, setChangePassDialog] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const currentPasswordRef = useRef();
  const newPasswordRef = useRef();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleClose = () => {
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };

  return (
    <UserContainer>
      <UserNavbar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3,
            padding: 3,
            mt: 3,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Avatar
              sx={{
                bgcolor: '#fff',
                boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.25)',
                width: '50px',
                height: '50px',
              }}
            >
              <img
                src={logo}
                alt="logo"
                style={{
                  width: '80%',
                  height: '80%',
                  objectFit: 'contain',
                }}
              />
            </Avatar>
            <Box>
              <Typography variant="h5">Profile</Typography>
              <Typography variant="subtitle1">{account?.login}</Typography>
            </Box>
          </Box>{' '}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              textAlign: 'center',
            }}
          >
            {account?.hasPremium && (
              <Typography variant="body1">
                Enjoy your premium features until {new Date(account?.userAdditionalFields.paymentTokenExpiry).toLocaleDateString()}.
              </Typography>
            )}
            {!account?.hasPremium && account?.hasTrial && (
              <Typography variant="body1">
                Take full advantage of your trial until {new Date(account?.userAdditionalFields.trialExpiry).toLocaleDateString()}.
              </Typography>
            )}
            {!account?.hasPremium && !account.hasTrial && (
              <Typography variant="body1">Your trial period has expired. Upgrade to premium to continue enjoying our services.</Typography>
            )}
          </Box>
          <TextField
            label="Username"
            variant="standard"
            value={account?.login}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Email"
            variant="standard"
            value={account?.email}
            InputProps={{
              readOnly: true,
            }}
          />
          {/* <TextField
            label="Full Name"
            variant="standard"
            value={account?.firstName + ' ' + account?.lastName}
            InputProps={{
              readOnly: true,
            }}
          /> */}
          <Button variant="outlined" onClick={() => setChangePassDialog(true)}>
            Change Password
          </Button>
        </Box>
        <SlideUp open={changePassDialog} onClose={() => setChangePassDialog(false)}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              padding: 3,
            }}
          >
            <Typography variant="h5">Change Password</Typography>
            <TextField
              label="Current Password"
              variant="outlined"
              type={showCurrentPassword ? 'text' : 'password'}
              inputRef={currentPasswordRef}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onPointerDown={() => setShowCurrentPassword(!showCurrentPassword)}>
                      {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="New Password"
              variant="outlined"
              type={showNewPassword ? 'text' : 'password'}
              inputRef={newPasswordRef}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onPointerDown={() => setShowNewPassword(!showNewPassword)}>
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              onPointerDown={() => {
                changePasswordReq(currentPasswordRef.current.value, newPasswordRef.current.value)
                  .then(response => {
                    console.log(response);
                    setChangePassDialog(false);
                  })
                  .catch(error => {
                    console.log(error);
                    setMessage('Incorrect password');
                    setOpen(true);
                  });
              }}
            >
              Change
            </Button>
          </Box>
        </SlideUp>{' '}
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      </Box>
    </UserContainer>
  );
};

export default Profile;
