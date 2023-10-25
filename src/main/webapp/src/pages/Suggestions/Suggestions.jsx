import { Avatar, Button, TextField, Typography } from '@mui/material';
import { Box, padding } from '@mui/system';
import React, { useRef } from 'react';
import UserContainer from '../../components/UserContainer';
import UserContent from '../../components/UserContent';
import UserNavbar from '../../components/UserNavbar';
import qq from '../../assets/images/qq2.png';
import { postSuggestion } from '../../axios/axios';
import { useNavigate } from 'react-router-dom';

const Suggestions = () => {
  const textRef = useRef();
  const authorRef = useRef();
  const navigate = useNavigate();
  return (
    <UserContainer>
      {/* <UserNavbar /> */}
      <UserContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
            maxWidth: '760px',
            margin: '0 auto',
          }}
        >
          <Typography variant="h5" mt={3}>
            SUGGESTIONS
          </Typography>
          <TextField
            multiline
            rows={7}
            // fullWidth
            variant="outlined"
            inputRef={textRef}
            placeholder="Enter your suggestions here"
            sx={{
              mt: 3,
              width: '90%',
              backgroundColor: '#f8f8f8',
              backgroundImage: `url(${qq})`,
              backgroundSize: 'auto 80%',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              border: '#c5c5c5 solid 2px',
              borderRadius: '0.5rem',
              outline: 'none',
              position: 'static',
              padding: '0.5rem',
            }}
          />
          <TextField
            variant="outlined"
            inputRef={authorRef}
            placeholder="Enter author's name here"
            sx={{
              mt: 3,
              width: '90%',
              backgroundColor: '#f8f8f8',
              backgroundImage: `url(${qq})`,
              backgroundSize: 'auto 80%',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              border: '#c5c5c5 solid 2px',
              borderRadius: '0.5rem',
              outline: 'none',
              position: 'static',
              padding: '0.5rem',
            }}
          />

          <Button
            mt={4}
            sx={{
              boxShadow: '0 0 8px 3px rgba(0, 0, 0, 0.2)',
              borderRadius: '2rem',
              padding: '0.5rem 1rem',
              marginTop: '2rem',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'space-between',
              gap: '1rem',
            }}
            onPointerDown={() => postSuggestion(textRef.current.value, authorRef.current.value).then(() => navigate('/thankyou'))
            }
          >
            <Avatar
              sx={{
                backgroundImage: 'linear-gradient(135deg, #91a7e0 30%, #9e92d8 90%)',
                height: '2rem',
                width: '2rem',
              }}
            >
              +
            </Avatar>
            <Typography
              variant="body1"
              sx={{
                color: '#000',
                textTransform: 'none',
              }}
            >
              Add suggestion
            </Typography>
          </Button>
          <Typography
            variant="body2"
            mt={3}
            sx={{
              color: '#000',
              fontSize: '0.8rem',
              textAlign: 'center',
            }}
          >
            Feel free to send us your suggestions, we look forward to it!
          </Typography>
        </Box>
      </UserContent>
    </UserContainer>
  );
};

export default Suggestions;
