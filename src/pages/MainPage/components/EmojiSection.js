import React, { useState } from 'react';
import { FaRegSmile } from 'react-icons/fa';

function EmojiSection() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2 shadow-md">
        <div className="flex space-x-2">
          <button className="bg-gray-300 p-2 rounded-full flex items-center justify-center">
            👍 10
          </button>
          <button className="bg-gray-300 p-2 rounded-full flex items-center justify-center">
            ❤️ 24
          </button>
          <button className="bg-gray-300 p-2 rounded-full flex items-center justify-center">
            😂 24
          </button>
        </div>
        <button onClick={toggleDropdown} className="ml-2 flex items-center">
          <FaRegSmile className="mr-1" /> 추가
        </button>
      </div>
      
      {isDropdownOpen && (
        <div className="absolute left-0 mt-2 bg-white border rounded-lg p-4 shadow-lg">
          <div className="flex flex-wrap gap-2">
            <button className="bg-gray-300 p-2 rounded-full flex items-center justify-center">
              👍 24
            </button>
            <button className="bg-gray-300 p-2 rounded-full flex items-center justify-center">
              ❤️ 12
            </button>
            <button className="bg-gray-300 p-2 rounded-full flex items-center justify-center">
              🎉 24
            </button>
            <button className="bg-gray-300 p-2 rounded-full flex items-center justify-center">
              😯 10
            </button>
            <button className="bg-gray-300 p-2 rounded-full flex items-center justify-center">
              🤩 8
            </button>
            <button className="bg-gray-300 p-2 rounded-full flex items-center justify-center">
              👏 10
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmojiSection;
