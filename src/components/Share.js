import React, { useState } from 'react';
import { ReactComponent as ShareIcon } from '../assets/share.svg';

function Share() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const copyToClipboard = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      setIsToastVisible(true);
      setTimeout(() => {
        setIsToastVisible(false);
      }, 5000);
    } catch (error) {
      console.error('Failed to copy: ', error);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="px-[6px] py-2 border rounded-[6px] border-gray300"
        onClick={toggleDropdown}
      >
        <ShareIcon className="w-[20px] h-[20px]" />
      </button>
      {isDropdownVisible && (
        <div className="absolute top-full right-1 mt-2">
          <div className="flex flex-col justify-center items-center w-[140px] h-[120px] bg-white border rounded-[8px] border-[#B6B6B6]">
            <button
              type="button"
              className="w-full px-4 py-3 font-regular text-[16px] leading-[26px] border-b cursor-pointer hover:bg-gray100"
              onClick={() => console.log('카카오톡 공유')}
            >
              카카오톡 공유
            </button>
            <button
              type="button"
              className="w-full px-4 py-3 font-regular text-[16px] leading-[26px] cursor-pointer hover:bg-gray100"
              onClick={copyToClipboard}
            >
              URL 공유
            </button>
          </div>
        </div>
      )}
      {isToastVisible && (
        <div className="fixed bottom-5 right-5 px-4 py-2 bg-black text-white rounded-md shadow-lg">
          URL이 클립보드에 복사되었습니다!
        </div>
      )}
    </div>
  );
}

export default Share;
