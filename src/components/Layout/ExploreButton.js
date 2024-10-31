import React from 'react';
import { Link } from 'react-router-dom';

function ExploreButton() {
  return (
    <Link
      to="/list"
      className="mt-8 px-8 py-2 bg-purple500 text-white rounded-lg w-full sm:w-auto hover:bg-purple-600 transition-colors"
    >
      구경해보기
    </Link>
  );
}

export default ExploreButton;
