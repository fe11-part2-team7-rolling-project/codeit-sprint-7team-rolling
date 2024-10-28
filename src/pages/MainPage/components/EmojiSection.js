// src/pages/MainPage/components/EmojiSection.js
import React, { useState, useMemo } from 'react';
import { FaRegSmile } from 'react-icons/fa';

function EmojiSection() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState);
  };

  // 드롭다운 내용이 고정된 값이라면 useMemo로 메모이제이션
  const dropdownContent = useMemo(() => (
    <div className="absolute left-0 mt-2 bg-white border rounded-lg p-4 shadow-lg">
      <div className="flex flex-wrap gap-2">
        <button type="button" className="bg-gray-300 p-2 rounded-full flex items-center justify-center">
          👍 24
        </button>
        <button type="button" className="bg-gray-300 p-2 rounded-full flex items-center justify-center">
          ❤️ 12
        </button>
        <button type="button" className="bg-gray-300 p-2 rounded-full flex items-center justify-center">
          🎉 24
        </button>
        <button type="button" className="bg-gray-300 p-2 rounded-full flex items-center justify-center">
          😯 10
        </button>
        <button type="button" className="bg-gray-300 p-2 rounded-full flex items-center justify-center">
          🤩 8
        </button>
        <button type="button" className="bg-gray-300 p-2 rounded-full flex items-center justify-center">
          👏 10
        </button>
      </div>
    </div>
  ), []); // 의존성 배열이 빈 배열이므로 한 번만 계산됨

  return (
    <div className="relative">
      <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2 shadow-md">
        <div className="flex space-x-2">
          <button type="button" className="bg-gray-300 p-2 rounded-full flex items-center justify-center">
            👍 10
          </button>
          <button type="button" className="bg-gray-300 p-2 rounded-full flex items-center justify-center">
            ❤️ 24
          </button>
          <button type="button" className="bg-gray-300 p-2 rounded-full flex items-center justify-center">
            😂 24
          </button>
        </div>
        <button type="button" onClick={toggleDropdown} className="ml-2 flex items-center">
          <FaRegSmile className="mr-1" /> 추가
        </button>
      </div>
      
      {isDropdownOpen && dropdownContent}
    </div>
  );
}

export default EmojiSection;
