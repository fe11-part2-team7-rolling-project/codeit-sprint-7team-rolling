import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { ReactComponent as ShareIcon } from '../assets/share.svg';

function Share() {
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

  const copyToClipboard = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      toast.success('URL이 복사 되었습니다.', {
        position: 'bottom-center',
        autoClose: 5000,
        className:
          'bg-black opacity-80 text-white font-regular text-[16px] leading-[26px] rounded-[8px]',
      });
    } catch (error) {
      console.error('Failed to copy: ', error);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
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
    </div>
  );
}

export default Share;
