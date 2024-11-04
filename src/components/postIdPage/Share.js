import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ReactComponent as ShareIcon } from '../../assets/share.svg';
import SEO from '../SEO';

function Share({ items }) {
  const { id } = useParams();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const defaultContent =
    '전통적인 롤링페이퍼 문화를 웹으로 구현한 커뮤니티형 플랫폼입니다.';
  const content =
    items.recentMessages && items.recentMessages[0]?.content
      ? items.recentMessages[0].content
      : defaultContent;

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
    console.log(id);
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

  const shareOnKakao = () => {
    window.Kakao.Share.sendCustom({
      templateId: 113686,
      templateArgs: {
        id,
        name: items.name,
        content,
      },
    });
  };

  return (
    <div className="relative pr-4" ref={dropdownRef}>
      <SEO title={items.name} description={content} />
      <button
        type="button"
        className="px-[6px] py-2 border rounded-[6px] border-gray300"
        onClick={toggleDropdown}
      >
        <ShareIcon className="w-[20px] h-[20px] dark:text-white text-[#101010]" />
      </button>
      {isDropdownVisible && (
        <div className="absolute top-full right-1 mt-2">
          <div className="flex flex-col justify-center items-center w-[140px] h-[120px] bg-white dark:bg-dark2 border rounded-[8px] border-gray300">
            <button
              type="button"
              className="w-full px-4 py-3 font-regular text-[16px] dark:text-gray200 leading-[26px] border-b border-gray300 cursor-pointer hover:bg-gray100 dark:hover:bg-gray600"
              onClick={shareOnKakao} // 카카오톡 공유 함수 연결
            >
              카카오톡 공유
            </button>
            <button
              type="button"
              className="w-full px-4 py-3 font-regular text-[16px] dark:text-gray200 leading-[26px] cursor-pointer hover:bg-gray100 dark:hover:bg-gray600"
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

Share.propTypes = {
  items: PropTypes.shape({
    name: PropTypes.string.isRequired,
    recentMessages: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        recipientId: PropTypes.number,
        sender: PropTypes.string,
        profileImageURL: PropTypes.string,
        relationship: PropTypes.string,
        content: PropTypes.string,
        font: PropTypes.string,
        createdAt: PropTypes.string,
      }),
    ),
  }).isRequired,
};

export default Share;
