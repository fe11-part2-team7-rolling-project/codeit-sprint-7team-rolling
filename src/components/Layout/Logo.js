// src/components/Layout/Logo.js
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
      role="button" // 접근성 role 추가
      tabIndex="0" // 키보드 탭을 허용
      onClick={handleClick}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()} // 키보드 접근성 개선
      className="cursor-pointer"
    >
      <img src={logo} alt="Rolling Logo" width={107} height={30} />
    </div>
  );
}

export default Logo;
