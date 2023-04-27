import { Alert, Avatar, Button, IconButton, InputAdornment, Snackbar, TextField, Typography } from '@mui/material';
import { Box, padding } from '@mui/system';
import React, { useRef, useState } from 'react';
import UserContainer from '../../components/UserContainer';
import UserContent from '../../components/UserContent';
import UserNavbar from '../../components/UserNavbar';
import SlideUp from '../../components/SlideUp';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { changePasswordReq } from '../../axios/axios';

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
      <UserContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 3,
            padding: 3,
          }}
        >
          <Typography variant="h5">Profile</Typography>

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
          <TextField
            label="Full Name"
            variant="standard"
            value={account?.firstName + ' ' + account?.lastName}
            InputProps={{
              readOnly: true,
            }}
          />
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
      </UserContent>
    </UserContainer>
  );
};

export default Profile;
