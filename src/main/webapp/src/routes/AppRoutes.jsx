import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Splash from '../pages/Splash/Splash';
import Login from '../pages/Login/Login.jsx';
import Registration from '../pages/Registration/Registration';
import Error from '../pages/Error/Error';

const AppRoutes = ({ setToken, parseToken }) => {

  
  return (
    <Routes>
      {/* <Route path="/" element={<Splash />} /> */}
      <Route path="/login" element={<Login setToken={setToken} parseToken={parseToken} />} />
      <Route path="/register" element={<Registration setToken={setToken} parseToken={parseToken} />} />
      <Route path="*" element={<Splash />} />
    </Routes>
  );
};

export default AppRoutes;
