import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Splash from '../pages/Splash/Splash';
import Login from '../pages/Login/Login.jsx';
import Registration from '../pages/Registration/Registration';
// import Error from '../pages/Error/Error';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';
import PasswordChange from '../pages/PassworChange/PasswordChange';
import CheckEmail from '../pages/CheckEmail/CheckEmail';

const AppRoutes = ({ setToken, parseToken, token }) => {
  return (
    <Routes>
      {/* <Route path="/" element={<Splash />} /> */}
      <Route path="/login" element={<Login setToken={setToken} parseToken={parseToken} />} />
      <Route path="/register" element={<Registration setToken={setToken} parseToken={parseToken} />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/check-email" element={<CheckEmail />} />
      <Route path="/account/reset/finish" element={<PasswordChange setToken={setToken} parseToken={parseToken} />} />
      <Route path="/" element={<Login setToken={setToken} parseToken={parseToken} />} />
    </Routes>
  );
};

export default AppRoutes;
