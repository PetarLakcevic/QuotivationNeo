import React from 'react';
import UserContainer from '../../components/UserContainer';
import UserNavbar from '../../components/UserNavbar';
import UserContent from '../../components/UserContent';
import { Box, Typography } from '@mui/material';

const Refund = () => {
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
          }}
        >
          <Typography variant="h4">Refund Policy for Quotivation App</Typography>
          <Typography variant="h5">Effective Date: July 6, 2023</Typography>

          <Typography variant="h6">Introduction</Typography>
          <Typography variant="body1">
            At Quotivation, we aim to deliver the highest quality products to our users. This Refund Policy ("Policy") applies to all
            purchases made through the Quotivation application.
          </Typography>
          <Typography variant="h6">In-app Purchases</Typography>
          <Typography variant="body1">
            Quotivation provides in-app purchases for premium content and features. Once purchased, these are credited to your account
            immediately.
          </Typography>
          <Typography variant="h6">Refund Requests</Typography>
          <Typography variant="body1">
            If you believe that an error has been made in your in-app purchase, you should submit a report to our Customer Support within 7
            days of the transaction. Please provide your account details, including your email and a description of the purported error.
            <br />
            <br />
            Once we receive your refund request, we will review it and reply within a reasonable time frame. If your refund request is
            justified, we will aim to process it as soon as possible.
            <br />
            <br />
            Please note that we are unable to provide refunds for purchases made more than 7 days prior to your request, or for purchases
            where the premium content or features have been used or accessed.
          </Typography>
          <Typography variant="h6">Non-recurring Subscriptions</Typography>
          <Typography variant="body1">
            Quotivation offers non-recurring subscription options. This means your subscription will not renew automatically at the end of
            the period, and we do not store any card or payment information. If you wish to continue using our premium services after your
            subscription period ends, you'll need to make another purchase.
          </Typography>
          <Typography variant="h6">Changes to This Policy</Typography>
          <Typography variant="body1">
            We may modify this Refund Policy at any time, so please review it frequently. Changes to this Refund Policy are effective when
            they are posted on this page.
          </Typography>
          <Typography variant="h6">Changes to the Refund Policy</Typography>
          <Typography variant="body1">
            We may update our Refund Policy from time to time. The updated version will be indicated by an updated “Effective Date” and the
            updated version will be effective as soon as it is accessible.
          </Typography>
          <Typography variant="h6">Contact Us</Typography>
          <Typography variant="body1">
            If you have any questions about this Refund Policy, you can contact us:{' '}
            <a
              href="mailto:quotivation.app@gmail.com"
              style={{
                textDecoration: 'none',
              }}
            >
              quotivation.app@gmail.com
            </a>
            <br /> <br />
            Thank you for choosing Quotivation.
          </Typography>
        </Box>
      </UserContent>
    </UserContainer>
  );
};

export default Refund;
