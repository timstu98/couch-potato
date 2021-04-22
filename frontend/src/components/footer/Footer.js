import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footerTop'>
        <a href=''>
          <img src='/twitter-square.svg' alt='twitter' />
        </a>
        <a href=''>
          <img src='/facebook-square.svg' alt='facebook' />
        </a>
        <a href=''>
          <img src='/instagram-square.svg' alt='instagram' />
        </a>
      </div>
      <div className='footerBottom'>
        <ul className='footerList' role='list'>
          <li>Contact</li>
          <li>About Us</li>
          <li>Terms &amp; Conditions</li>
          <li>Careers</li>
          <li>Change Country</li>
          <li>FAQ</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
