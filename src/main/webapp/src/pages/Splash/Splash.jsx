import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { accountReq } from '../../axios/axios';

const Splash = ({ token, parseToken }) => {
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    accountReq()
      .then(res => {
        setAccount(res.data);
      })
      .catch(err => {
        console.error(err);
        navigate('/login');
      });
  }, []);

  useEffect(() => {
    if (account) {
      if (account.authorities.includes('ROLE_ADMIN')) {
        navigate('/adminpanel');
      } else {
        if (account?.categoryList?.length < 1) {
          navigate('/category');
        } else {
          navigate('/home');
        }
      }
    }
  }, [account]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (token) {
  //       if (parseToken(token).auth.includes('ROLE_ADMIN')) {
  //         navigate('/adminpanel');
  //       } else {
  //         navigate('/home');
  //       }
  //     } else {
  //       navigate('/login');
  //     }
  //   }, 2000);
  //   return () => clearTimeout(timer);
  // }, [token]);

  return <div></div>;
};

export default Splash;
