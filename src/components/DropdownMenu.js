// DropdownMenu.js
import React, { useState } from 'react';
import { ReactComponent as Dropdown } from '../assets/ic_drop.svg';
import ReactionIconBtn from './ReactionIconBtn';

function DropdownMenu() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="relative flex flex-row justify-center items-center">
      <button type="button" onClick={toggleDropdown}>
        <Dropdown />
      </button>

      {isDropdownVisible && (
        <div className="absolute top-full mt-2 ">
          <div className="flex p-4 gap-[10px] bg-white border rounded-[8px] border-[#B6B6B6]">
            <ReactionIconBtn />
            <ReactionIconBtn />
            <ReactionIconBtn />
          </div>
        </div>
      )}
    </div>
  );
}
export default DropdownMenu;
