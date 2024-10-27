import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';

function Logo() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div className="cursor-pointer" onClick={handleClick}>
      <img src={logo} alt="Rolling Logo" width={107} height={30} />
    </div>
  );
}

export default Logo;
