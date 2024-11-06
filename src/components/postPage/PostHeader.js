import React from "react";
import Logo from "../Layout/Logo";
import DarkModeButton from "../Layout/DarkModeButton";

function PostHeader() {
  return (
    <header className="bg-white dark:bg-dark2 shadow-md w-full py-4 px-6 md:px-24 lg:px-48">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Logo />
        <div className="flex-shrink-0 ml-auto">
          <DarkModeButton />
        </div>
      </div>
    </header>
  );
}

export default PostHeader;
