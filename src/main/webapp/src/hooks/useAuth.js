// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import useLocalStorage from 'react-use-localstorage';
import { loginReq } from '../axios/axios.js';

function useAuth() {
  const [token, setToken] = useLocalStorage('token', '');
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const parseToken = (t) => {
    return JSON.parse(atob(t.split('.')[1]));
  };

  useEffect(() => {
    if (token) {
      const parsedToken = parseToken(token);
      setLoggedIn(true);
      setUserRole(parsedToken.auth.includes('ROLE_ADMIN') ? 'ROLE_ADMIN' : 'ROLE_USER');
      localStorage.setItem('userRole', userRole);
    } else {
      setLoggedIn(false);
      setUserRole(null);
      localStorage.removeItem('userRole');
    }
  }, [token]);

  useEffect(() => {
    const storedUserRole = localStorage.getItem('userRole');
    if (storedUserRole) {
      setUserRole(storedUserRole);
    }
  }, []);

  const handleLogin = (username, password) => {
    return loginReq(username, password)
      .then(response => {
        setToken(response.data.id_token);
        const parsedToken = parseToken(response.data.id_token);
        setUserRole(parsedToken.auth.includes('ROLE_ADMIN') ? 'ROLE_ADMIN' : 'ROLE_USER');
        localStorage.setItem('userRole', userRole);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return { loggedIn, parseToken, userRole, setToken, handleLogin, setLoggedIn, setUserRole };
}

export default useAuth;
