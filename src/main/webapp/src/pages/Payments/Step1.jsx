import React, { useEffect, useState } from 'react';
import UserContainer from '../../components/UserContainer';
import UserNavbar from '../../components/UserNavbar';
import UserContent from '../../components/UserContent';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Step1 = ({ account }) => {
  const navigate = useNavigate();
  const [planText, setPlanText] = useState('');
  useEffect(() => {
    const expiryDate = new Date(account?.paymentTokenExpiry).toLocaleDateString();
    const registrationDate = new Date(account?.registrationDate);
    const trialEndDate = new Date(registrationDate);
    trialEndDate.setDate(trialEndDate.getDate() + 7);
    const trialEndDateString = trialEndDate.toLocaleDateString();

    const nonRenewalNotice =
      ' Your subscription will not be automatically renewed. You will be notified one week before your renewal options expire.';
    const cancellationNotice = '  You may cancel your subscription within 7 days of purchase.';
    const cardInfoNotice = ' We do not store your card information.';
    // setPlanText(`Your trial period has expired. Consider upgrading to premium.${cancellationNotice} ${nonRenewalNotice} ${cardInfoNotice}`);
    if (!account?.hasPremium && account?.hasTrial) {
      setPlanText(
        `You don't have a premium account. Your trial period will end on the ${trialEndDateString}. Consider upgrading to premium. ${cancellationNotice} ${nonRenewalNotice} ${cardInfoNotice}`
      );
    } else if (!account?.hasPremium && !account?.hasTrial) {
      setPlanText(
        `Your trial period has expired. Consider upgrading to premium.${cancellationNotice} ${nonRenewalNotice} ${cardInfoNotice}`
      );
    }
  }, [account]);

  const premiumText = {
    title: 'PRODUCT DESCRIPTION',
    text: 'Premium account offering one year (365 days) of daily quotes, that means:',
    additional: [
      { title: 'Two quotes daily', text: ', directly within the app – that’s 730 quotes over an entire year.' },
      {
        title: 'Notifications',
        text: " that remind you to stay up to date with the newest quotes (provided you've subscribed to notifications).",
      },
      {
        title: 'History ',
        text: ' – you can review all of the quotes you have already gotten in the history panel of the application.',
      },
    ],
    desc: 'The total cost for this premium service is 2,000.00 RSD',
  };
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
          <Typography variant="h6">CURRENT PLAN</Typography>
          <Typography variant="body1">{planText}</Typography>
          {/* <Typography variant="h6">WHAT YOU GET WITH PREMIUM?</Typography> */}
          <Typography variant="h6">{premiumText.title}</Typography>
          <Typography variant="body1">{premiumText.text}</Typography>
          <Box>
            {premiumText?.additional?.map((item, index) => (
              <Typography variant="body1">
                <b>{item.title}</b>
                {item.text}
              </Typography>
            ))}
          </Box>
          <Typography variant="body1">{premiumText?.desc}</Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              mt: 3,
            }}
          >
            <Button
              variant="contained"
              sx={{
                //   marginInline: 'auto',
                bgcolor: '#478D8A',
              }}
              onPointerDown={() => navigate('/payments/step2')}
            >
              {' '}
              <Typography variant="body1" sx={{ color: '#fff' }}>
                Continue
              </Typography>
            </Button>
            <Button
              variant="outlined"
              sx={{
                color: '#478D8A',
                borderColor: '#478D8A',
              }}
              onPointerDown={() => navigate('/home')}
            >
              {' '}
              <Typography variant="body1" sx={{ color: '#478D8A' }}>
                Back to home
              </Typography>
            </Button>
          </Box>
        </Box>
      </UserContent>
    </UserContainer>
  );
};

export default Step1;
