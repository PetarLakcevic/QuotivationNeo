import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Splash from '../pages/Splash/Splash';
import AdminPanel from '../pages/adminPages/AdminPanel/AdminPanel';
import Quotes from '../pages/adminPages/Qutoes/Quotes';
import Authors from '../pages/adminPages/Authors/Authors';
import Author from '../pages/adminPages/Authors/Author';
import Users from '../pages/adminPages/Users/Users';
import Categories from '../pages/adminPages/Categories/Categories';
import QuoteSuggestions from '../pages/adminPages/QuoteSuggestions/QuoteSuggestions';
import Navbar from '../components/Navbar';
import Error from '../pages/Error/Error';
import UserNavbar from '../components/UserNavbar';
import CategoryAdmin from '../pages/adminPages/Categories/CategoryAdmin';

const ProtectedRoutes = () => {
  return (
    <>
      {/* <Navbar /> */}
      <UserNavbar/>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/adminpanel" element={<AdminPanel />} />
        <Route path="/adminpanel/quotes" element={<Quotes />} />
        <Route path="/adminpanel/authors" element={<Authors />} />
        <Route path="/adminpanel/author/:id" element={<Author />} />
        <Route path="/adminpanel/users" element={<Users />} />
        <Route path="/adminpanel/categories" element={<Categories />} />
        <Route path="/adminpanel/category/:id" element={<CategoryAdmin />} />
        <Route path="/adminpanel/quote_suggestions" element={<QuoteSuggestions />} />
        {/* <Route path="*" element={<Error />} /> */}
      </Routes>
    </>
  );
};

export default ProtectedRoutes;
