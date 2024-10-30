import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types'; // import 추가
import { ReactComponent as Dropdown } from '../assets/ic_drop.svg';

function DropdownMenu({ reactions }) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    if (isDropdownVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // cleanup
    };
  }, [isDropdownVisible]);

  return (
    <div
      className="relative flex flex-row justify-center items-center"
      ref={dropdownRef}
    >
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

DropdownMenu.propTypes = {
  reactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      emoji: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default DropdownMenu;
