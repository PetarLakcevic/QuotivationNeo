import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Welcome from '../pages/Welcome/Welcome';
import Theme from '../pages/Theme/Theme';
import Category from '../pages/Category/Category';
import Quote from '../pages/Quote/Quote';
// import Error from '../pages/Error/Error';
import History from '../pages/History/History';
import Suggestions from '../pages/Suggestions/Suggestions';
import Profile from '../pages/Profile/Profile';
import ThankYou from '../pages/Suggestions/ThankYou';
import { requestNotificationPermission, scheduleDailyNotification } from '../pushNotifications';
import { accountReq } from '../axios/axios';
import ActivateAccount from '../pages/ActivateAccount/ActivateAccount';
import Payments from '../pages/Payments/Payments';
import PasswordChange from '../pages/PassworChange/PasswordChange';
import { Box, Button, Paper, Slide, Snackbar, Typography } from '@mui/material';
import crown from '../assets/images/crown.png';
import Contact from '../pages/Contact/Contact';
import Privacy from '../pages/Privacy/Privacy';
import Refund from '../pages/Refund/Refund';
import ActivatePremium from '../pages/ActivatePremium/ActivatePremium';
import Terms from '../pages/Terms/Terms';
import Step1 from '../pages/Payments/Step1';
import Step2 from '../pages/Payments/Step2';
import Home from '../pages/Home/Home';

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

const UserRoutes = ({ isLandscape }) => {
  const [account, setAccount] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    accountReq().then(res => {
      setAccount(res.data);
      console.log(res.data);
    });
  }, []);

  useEffect(() => {
    if (account && account?.categoryList.length === 0) {
      console.log('Nije aktiviran');
      navigate('/welcome');
    }
  }, [account]);

  useEffect(() => {
    const initNotifications = async () => {
      const permission = await requestNotificationPermission();

      if (permission === 'granted') {
        scheduleDailyNotification(
          'Notifikacija u 12:00',
          {
            body: 'New quote is waiting for you!',
            icon: '/logo5.png',
          },
          12
        ); // Zakazivanje notifikacije u 12:00

        scheduleDailyNotification(
          'Notifikacija u 20:00',
          {
            body: 'New quote is ready for you!',
            icon: '/logo5.png',
          },
          20
        ); // Zakazivanje notifikacije u 20:00
      }
    };

    initNotifications();
  }, []);

  // useEffect(() => {
  //   if (location.pathname === '/login') {
  //     navigate('/');
  //   }
  // }, [location]);

  const snackbarText = {
    title: 'Try Quotivation Premium!',
    body: 'Unlock everything!',
    description: [
      '• Original and unique quotes',
      '• Quotes for any situation',
      '• Unique themes',
      '• Full reminders to change your mindset',
      '• No watermarks, no ads',
    ],
  };

  return (
    <>
      {/* <Box
        sx={{
          position: 'fixed',
          top: 10,
          left: 10,
          zIndex: '1000',
        }}
      >
        <img src={crown} alt="crown" style={{ width: '35px', height: '35px' }} />
      </Box> */}
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/theme" element={<Theme account={account} setAccount={setAccount} isLandscape={isLandscape} />} />
        <Route path="/category" element={<Category account={account} setAccount={setAccount} />} />
        {/* <Route path="/" element={<Home account={account} />} /> */}
        <Route path="/home" element={<Quote account={account} />} />
        <Route path="/suggestions" element={<Suggestions />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/refund" element={<Refund />} />
        <Route path="/terms-&-conditions" element={<Terms  account={account}/>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/thankyou" element={<ThankYou />} />
        <Route path="/history" element={<History account={account} />} />
        <Route path="/profile" element={<Profile account={account} />} />
        <Route path="payments/step1" element={<Step1 account={account}/>} />
        {/* <Route path="payments/step2" element={<Step2 />} /> */}

        <Route path="/payments/step2" element={<Payments isLandscape={isLandscape} />} />
        <Route path="/payment-status" element={<ActivatePremium />} />
        <Route path="/account/reset/finish" element={<PasswordChange />} />
      </Routes>{' '}
      <Snackbar open={open} autoHideDuration={6000} TransitionComponent={TransitionUp}>
        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              // backgroundColor: '#f5f5f5',
              // borderRadius: '10px',
              padding: '20px',
            }}
            component={Paper}
            elevation={5}
          >
            <img
              src={crown}
              alt="crown"
              style={{
                width: '35px',
                height: '35px',
                backgroundImage: 'linear-gradient(35deg, hsl(193, 66%, 52%), hsl(144, 25%, 57%), #aac0d0)',
                borderRadius: '50%',
                padding: '5px',
              }}
            />
            <Typography variant="h5">{snackbarText.title}</Typography>

            <Typography
              variant="h6"
              sx={{
                mb: '10px',
              }}
            >
              {snackbarText.body}
            </Typography>

            {snackbarText.description.map((item, index) => (
              <Typography key={index} variant="h6">
                {item}
              </Typography>
            ))}
            <Box
              sx={{
                display: 'flex',
                gap: '10px',
              }}
            >
              <Button
                variant="contained"
                sx={{ mt: '10px', backgroundImage: 'linear-gradient(135deg, hsl(193, 66%, 32%), hsl(144, 25%, 47%), #aac0d0)' }}
                onPointerDown={() => {
                  navigate('/premium');
                  setOpen(false);
                }}
              >
                Try it now!
              </Button>
              <Button
                variant="outlined"
                color="success"
                sx={{ mt: '10px' }}
                onPointerDown={() => {
                  setOpen(false);
                }}
              >
                Remind me later
              </Button>
            </Box>
          </Box>
        </Box>
      </Snackbar>
    </>
  );
};

export default UserRoutes;
