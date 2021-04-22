import React, { useContext } from 'react';
import './landingcontent.css';
import { Link, Redirect } from 'react-router-dom';
import AppContext from '../../context/app-context';

const LandingContent = () => {
  const { auth } = useContext(AppContext);

  return (
    <>
      {auth.isAuthenticated && <Redirect to='/' />}
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
