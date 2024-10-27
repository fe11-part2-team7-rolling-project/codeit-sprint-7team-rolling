import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';

function Logo() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div
      role="button" 
      tabIndex="0" 
      onClick={handleClick}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()} 
      className="cursor-pointer"
    >
      <img src={logo} alt="Rolling Logo" width={107} height={30} />
    </div>
  );
}

export default Logo;
