import React, { useState } from 'react';
import { ReactComponent as Dropdown } from '../assets/ic_drop.svg';

function DropdownMenu({ reactions }) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  return (
    <div className="relative flex flex-row justify-center items-center">
      <button type="button" onClick={toggleDropdown}>
        <Dropdown />
      </button>

      {isDropdownVisible && (
        <div className="absolute top-full mt-2">
          <div className="flex flex-col p-4 gap-2 bg-white border rounded-[8px] border-[#B6B6B6]">
            {reactions.map((reaction) => (
              <div
                key={reaction.id}
                className="flex justify-center items-center px-2 py-1 gap-2 rounded-[32px] bg-black/[.54]"
              >
                <span className="text-[18px]">{reaction.emoji}</span>
                <span className="text-[14px] text-white leading-[20px] font-regular">
                  {reaction.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
