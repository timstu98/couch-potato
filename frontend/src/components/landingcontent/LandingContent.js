import React from 'react';
import './landingcontent.css';
import Button from '../button/Button.js';

const LandingContent = () => {
  return (
    <>
      <h1>Are you ready for something more?</h1>
      <h3>bespoke workout routines built for you from your preferences</h3>
      <div className='landingButtons'>
        <Button buttonName='Sign Up' />
        <Button buttonName='Log In' />
      </div>
    </>
  );
};

export default LandingContent;
