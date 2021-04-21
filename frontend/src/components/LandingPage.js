import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './navbar/Navbar';
import Footer from './footer/Footer';

const LandingPage = () => {
  return (
    <div>
      <NavBar />
      <h1>Are you ready for something more?</h1>
      <Link to='/login'>Login</Link>
      <Link to='/signup'>Sign Up</Link>
      <Footer />
    </div>
  );
};

export default LandingPage;
