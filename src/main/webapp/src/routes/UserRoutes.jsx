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

const UserRoutes = () => {
  const [account, setAccount] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

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
        scheduleDailyNotification('Notifikacija u 12:00', {
          body: 'New quote is waiting for you!',
          icon: '/logo5.png',
        }, 12); // Zakazivanje notifikacije u 12:00
  
        scheduleDailyNotification('Notifikacija u 20:00', {
          body: 'New quote is ready for you!',
          icon: '/logo5.png',
        }, 20); // Zakazivanje notifikacije u 20:00
      }
    };
  
    initNotifications();
  }, []);

  useEffect(() => {
    if (location.pathname === '/login') {
      navigate('/');
    }
  }, [location]);
  

  return (
    <Routes>
      <Route path="/welcome" element={
        account?.activated ? <Welcome /> : <ActivateAccount/>} />
      <Route path="/theme" element={<Theme account={account} setAccount={setAccount} />} />
      <Route path="/category" element={<Category account={account} setAccount={setAccount} />} />
      <Route path="/home" element={<Quote account={account} />} />
      <Route path="/suggestions" element={<Suggestions />} />
      <Route path="/thankyou" element={<ThankYou />} />
      <Route path="/history" element={<History account={account} />} />
      <Route path="/profile" element={<Profile account={account} />} />
    </Routes>
  );
};

export default UserRoutes;
