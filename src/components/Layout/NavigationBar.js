// src/components/Layout/NavigationBar.js
import React, { useState } from 'react';
import { FaRegSmile } from 'react-icons/fa';
import PropTypes from 'prop-types';
import Toast from '../UI/Toast';

function NavigationBar({ profileImages, emojiCounts, onAddClick }) {
  const [showToast, setShowToast] = useState(false);

  // URL 복사 핸들러
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000); // 5초 동안 토스트 메시지 표시
      })
      .catch((err) => console.error('URL 복사 실패:', err));
  };

  return (
    <div className="flex items-center space-x-4 px-6 py-3 bg-white shadow-md max-w-[1200px] w-full mx-auto">
      {/* 프로필 이미지 목록 */}
      <div className="flex -space-x-2">
        {profileImages.slice(0, 3).map((src, index) => (
          <img key={index} src={src} alt="profile" className="w-8 h-8 rounded-full border-2 border-white" />
        ))}
        {profileImages.length > 3 && (
          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-sm text-gray-600 border-2 border-white">
            +{profileImages.length - 3}
          </span>
        )}
      </div>
      <span className="text-sm text-gray-600">9명이 작성했어요!</span>

      {/* 이모지 카운트 */}
      <div className="flex items-center space-x-2">
        {emojiCounts.slice(0, 8).map((emoji, index) => (
          <button key={index} type="button" className="bg-gray-300 px-2 py-1 rounded-full">
            {emoji.icon} {emoji.count}
          </button>
        ))}

        {/* 추가 버튼 */}
        <button onClick={onAddClick} type="button" className="border rounded-lg p-1 flex items-center space-x-1 hover:bg-gray-100">
          <FaRegSmile className="mr-1 text-gray-600" />
          <span>추가</span>
        </button>

        {/* URL 복사 버튼 */}
        <button onClick={handleCopyUrl} type="button" className="border rounded-lg p-1 hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8" />
            <polyline points="7 10 12 4 17 10" />
            <line x1="12" y1="4" x2="12" y2="16" />
          </svg>
        </button>
      </div>

      {/* URL 복사 후 토스트 메시지 */}
      {showToast && <Toast message="URL이 복사되었습니다." />}
    </div>
  );
}

NavigationBar.propTypes = {
  profileImages: PropTypes.arrayOf(PropTypes.string).isRequired,
  emojiCounts: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    })
  ).isRequired,
  onAddClick: PropTypes.func.isRequired,
};

export default NavigationBar;
