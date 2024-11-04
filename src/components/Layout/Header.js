// src/components/Layout/Header.js
import React from "react";
import Logo from "./Logo";
import CreateButton from "./CreateButton";

function Header() {
  return (
    <header className="bg-white w-full py-4 px-6 md:px-6 lg:px-48 shadow-md mb-16">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Logo />
        <div className="flex-shrink-0 ml-auto">
          <CreateButton />
        </div>
      </div>
    </header>
  );
}

export default Header;
