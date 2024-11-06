// src/components/Layout/Header.js
import React from "react";
import Logo from "./Logo";
import CreateButton from "./CreateButton";
import DarkModeButton from "./DarkModeButton";

function Header() {
  return (
    <header className="bg-white dark:bg-dark2 w-full py-4 px-6 md:px-6 lg:px-48 shadow-md mb-16">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Logo />
        <div className="flex items-center flex-shrink-0 ml-auto">
          <DarkModeButton />
          <CreateButton />
        </div>
      </div>
    </header>
  );
}

export default Header;
