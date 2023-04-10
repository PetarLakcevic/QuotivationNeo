import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Welcome from '../pages/Welcome/Welcome';
import Theme from '../pages/Theme/Theme';
import Category from '../pages/Category/Category';
import Quote from '../pages/Quote/Quote';
import Error from '../pages/Error/Error';
import History from '../pages/History/History';
import { getCategories, accountReq } from '../axios/axios';
import Suggestions from '../pages/Suggestions/Suggestions';

const UserRoutes = () => {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    accountReq().then(res => {
      setAccount(res.data);
      console.log(res.data);
    });
  }, []);
  return (
    <Routes>
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/theme" element={<Theme account={account } setAccount={setAccount}/>} />
      <Route path="/category" element={<Category account={account } setAccount={setAccount}/>} />
      <Route path="/home" element={<Quote account={account } />} />
      <Route path="/suggestions" element={<Suggestions />} />
    <Route path='/history' element={<History account={account }/>} /> 
      {/* <Route path="*" element={<Error />} /> */}
    </Routes>
  );
};

export default UserRoutes;
