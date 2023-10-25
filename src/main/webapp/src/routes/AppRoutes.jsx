import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Splash from '../pages/Splash/Splash';
import Login from '../pages/Login/Login.jsx';
import Registration from '../pages/Registration/Registration';
// import Error from '../pages/Error/Error';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';
import PasswordChange from '../pages/PassworChange/PasswordChange';
import CheckEmail from '../pages/CheckEmail/CheckEmail';
import Home from '../pages/Home/Home';
import Terms from '../pages/Terms/Terms';
import NoUserNavbar from '../components/NoUserNavbar';
import Privacy from '../pages/Privacy/Privacy';
import Footer from '../components/Footer';

const AppRoutes = ({ setToken, parseToken, token }) => {
  const location = useLocation();
  return (
    <>
      {' '}
      <NoUserNavbar />
      <Routes>
        {/* <Route path="/" element={<Splash />} /> */}
        <Route path="/login" element={<Login setToken={setToken} parseToken={parseToken} />} />
        <Route path="/register" element={<Registration setToken={setToken} parseToken={parseToken} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/check-email" element={<CheckEmail />} />
        <Route path="/account/reset/finish" element={<PasswordChange setToken={setToken} parseToken={parseToken} />} />
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms-&-conditions" element={<Terms />} />
      </Routes>
      {location.pathname !== '/' && location.pathname !== '/login'&& location.pathname !== '/register' && location.pathname !== '/forgot-password'&& <Footer />}
      {/* <Footer /> */}
    </>
  );
};

export default AppRoutes;
