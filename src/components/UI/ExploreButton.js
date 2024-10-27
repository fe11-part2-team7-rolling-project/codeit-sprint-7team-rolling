// src/components/UI/ExploreButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function ExploreButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/list');
  };

  return (
    <button
      type="button" // type 속성 추가
      onClick={handleClick}
      className="mt-8 px-6 py-2 bg-purple-500 text-white rounded-lg w-full sm:w-auto hover:bg-purple-600 transition-colors"
    >
      구경해보기
    </button>
  );
}

export default ExploreButton;
