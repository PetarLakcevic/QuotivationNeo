import { useState, useRef, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import axios from 'axios';
import Login from './pages/Login/Login.jsx';
import useLocalStorage from 'react-use-localstorage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminPanel from './pages/adminPages/AdminPanel/AdminPanel';
import Error from './pages/Error/Error';
import Splash from './pages/Splash/Splash';
import Registration from './pages/Registration/Registration';
import { Box } from '@mui/material';
import AppRoutes from './routes/AppRoutes';
import ProtectedRoutes from './routes/ProtectedRoutes';
import UserRoutes from './routes/UserRoutes';
import { Outlet } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const userNameRef = useRef(null);
  const passwordRef = useRef(null);
  const [token, setToken] = useLocalStorage('token', '');
  const [loggedIn, setLoggedIn] = useState(false);

  const parseToken = t => {
    return JSON.parse(atob(t.split('.')[1]));
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
      console.log(parseToken(localStorage.getItem('token')));
    
    }
  }, []);

  useEffect(() => {
    if (token) {
      console.log(token);
      console.log(parseToken(token));
    }
  }, [token]);

  const renderRoutes = () => {
    if (!token) {
      return <AppRoutes token={token} setToken={setToken} loggedIn={loggedIn} parseToken={parseToken} />;
    }
    if (token && parseToken(token).auth.includes('ROLE_ADMIN')) {
      return <ProtectedRoutes />;
    }
    if (token && parseToken(token).auth.includes('ROLE_USER')) {
      return <UserRoutes />;
    }
  };

  return (
    <GoogleOAuthProvider clientId="230834961464-it87cplru84s90ih3blbh1c9fkhdao90.apps.googleusercontent.com">
      <Box
        className="App"
        sx={{
          minHeight: window.innerHeight,
          // backgroundImage: 'linear-gradient(135deg, hsl(193, 66%, 32%), hsl(144, 25%, 57%), #aac0d0)',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Splash token={token} parseToken={parseToken} />} />
          </Routes>
          {renderRoutes()}
        </BrowserRouter>
      </Box>
    </GoogleOAuthProvider>
  );
}

export default App;
