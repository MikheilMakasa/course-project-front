import React from 'react';
import logo from '../images/logo.png';

const Footer = () => {
  return (
    <footer className='footer'>
      <img src={logo} alt='ureview' />
      <span>
        Created by <b>M. Makasa</b>
      </span>
    </footer>
  );
};

export default Footer;
