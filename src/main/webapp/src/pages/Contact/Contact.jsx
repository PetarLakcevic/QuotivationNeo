import React from 'react';
import UserContainer from '../../components/UserContainer';
import UserNavbar from '../../components/UserNavbar';
import UserContent from '../../components/UserContent';
import { Box, Typography } from '@mui/material';

const Contact = () => {
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
            gap: 3,
            textAlign: 'center',
            textDecoration: 'none',
            maxWidth: '760px',
            margin: '0 auto',
          }}
        >
          <Typography variant="h3">Contact</Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            We value the relationship we have with our users and we're committed to providing you with the highest level of service. Should
            you have any questions or concerns, please don't hesitate to reach out to us at any time. We're available to assist you at 
            <a href="mailto:quotivation.app@gmail.com" style={{
                textDecoration: 'none',
            }}> quotivation.app@gmail.com</a> or 
            <a href="mailto:quotivation.info@gmail.com." style={{
                textDecoration: 'none',
            }}> quotivation.info@gmail.com</a>. Your inquiries will be handled promptly and
            professionally.
          </Typography>
        </Box>
      </UserContent>
    </UserContainer>
  );
};

export default Contact;
