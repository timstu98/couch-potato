import React from 'react';
import './landingcontent.css';
import { Link } from 'react-router-dom';

const LandingContent = () => {
  return (
    <>
      <h1>Are you ready for something more?</h1>
      <h3>bespoke workout routines built for you from your preferences</h3>
      <div className='landingButtons'>
        <Link to='/signup'>
          <button type='button'>Sign Up</button>
        </Link>
        <Link to='/login'>
          <button type='button'>Login</button>
        </Link>
      </div>
    </>
  );
};

export default LandingContent;
