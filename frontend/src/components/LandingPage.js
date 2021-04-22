import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './navbar/Navbar';
import Footer from './footer/Footer';

const LandingPage = () => {
  return (
    <div>
      <NavBar />
      <h1>Are you ready for something more?</h1>
      <Link to='/login'>
        <button type='button'>Login</button>
      </Link>
      <Link to='/signup'>
        <button type='button'>Sign Up</button>
      </Link>
      <Footer />
    </div>
  );
};

export default LandingPage;
