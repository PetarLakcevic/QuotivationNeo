import React from 'react';
import UserContainer from '../../components/UserContainer';
import UserNavbar from '../../components/UserNavbar';
import UserContent from '../../components/UserContent';
import { Box, Typography } from '@mui/material';

const Privacy = () => {
  return (
    <UserContainer>
      <UserNavbar />
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
          <Typography variant="h4">Privacy Policy for Quotivation App</Typography>
          <Typography variant="h5">Effective Date: July 6, 2023</Typography>

          <Typography variant="h6">Introduction</Typography>
          <Typography variant="body1">
            Welcome to the Quotivation App ("We", "Our", "Us"). We respect the privacy concerns of all users of our application. We believe
            it is important you understand how we treat the information we receive from you, to this effect, we stand by the following
            privacy principles.
          </Typography>
          <Typography variant="h6">Personal Information We Collect</Typography>
          <Typography variant="body1">
            The only Personal Information we collect is your email address when you sign up for our service. "Personal Information" refers
            to data that can be used to identify you directly or indirectly. In our case, this is limited to your email address. <br />
            <br />
            We do not collect any other Personal Information about you, and we do not collect or process any non-Personal Information, like
            IP addresses, cookies, or usage data.
          </Typography>
          <Typography variant="h6">How We Use Your Personal Information</Typography>
          <Typography variant="body1">
            We use your email address only for the purpose of sending you motivational quotes, updates about our service, and communication
            related to your account. We do not process your email address in any other way. We do not use your email address for marketing
            purposes unless you explicitly agree to receive marketing materials.
          </Typography>
          <Typography variant="h6">How We Share Your Personal Information</Typography>
          <Typography variant="body1">
            We do not share, sell, rent, or trade your Personal Information collected through the Quotivation App with third parties. Your
            privacy is crucial to us, and your email address will only be used for the purposes outlined in this Privacy Policy.
          </Typography>
          <Typography variant="h6">Data Security</Typography>
          <Typography variant="body1">
            We take the security of your Personal Information seriously and use appropriate technical and organizational measures to protect
            your Personal Information against unauthorized or unlawful processing and against accidental loss, destruction, or damage.
            However, please note that no system is ever completely secure.
          </Typography>
          <Typography variant="h6">Changes to the Privacy Policy</Typography>
          <Typography variant="body1">
            We may update our Privacy Policy from time to time. The updated version will be indicated by an updated “Effective Date” and the
            updated version will be effective as soon as it is accessible.
          </Typography>
          <Typography variant="h6">Contact Information</Typography>
          <Typography variant="body1">
            If you have questions or comments about this policy, email us at{' '}
            <a
              href="mailto:quotivation.app@gmail.com"
              style={{
                textDecoration: 'none',
              }}
            >
              quotivation.app@gmail.com
            </a>
            <br /> <br />
            Thank you for choosing Quotivation. We value your trust and privacy.
          </Typography>
        </Box>
      </UserContent>
    </UserContainer>
  );
};

export default Privacy;
