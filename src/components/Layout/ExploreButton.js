import React from "react";
import { Link } from "react-router-dom";

function ExploreButton() {
  return (
    <Link
      to="/list"
      className="px-32 py-4 font-light text-lg bg-purple600 text-white rounded-lg hover:bg-purple800 transition-colors min-[376px]:px-80 min-[1025px]:px-24"
    >
      구경해보기
    </Link>
  );
}

export default ExploreButton;
