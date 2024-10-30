import React from 'react';
import { Link } from 'react-router-dom';

function CreateButton() {
  return (
    <Link
      to="/post"
      className="text-gray700 border border-gray-400 px-4 py-2 rounded-md"
    >
      롤링 페이지 만들기
    </Link>
  );
}

export default CreateButton;
