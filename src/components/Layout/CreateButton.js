import React from "react";
import { Link } from "react-router-dom";

function CreateButton() {
  return (
    <Link
      to="/post"
      className="text-gray700 dark:text-white border border-gray300 px-4 py-2 rounded-md font-regular"
    >
      롤링 페이퍼 만들기
    </Link>
  );
}

export default CreateButton;
