import React from 'react';
import { useNavigate } from 'react-router-dom';

function CreateButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/post');
  };

  return (
    <button
      onClick={handleClick}
      className="text-gray-700 border border-gray-400 px-4 py-2 rounded-md"
    >
      롤링 페이지 만들기
    </button>
  );
}

export default CreateButton;
