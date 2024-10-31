import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';

function Logo() {
  return (
    <Link to="/" className="cursor-pointer">
      <img src={logo} alt="Rolling Logo" width={107} height={30} />
    </Link>
  );
}

export default Logo;
