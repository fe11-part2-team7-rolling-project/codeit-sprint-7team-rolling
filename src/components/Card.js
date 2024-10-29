import React from 'react';
import PropTypes from 'prop-types';
import plusCircle from '../assets/pluscircle.svg';

function Card({ from, text, date, profileImage }) {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg flex items-center w-48 min-w-[12rem] sm:w-56 flex-shrink-0">
      {profileImage ? (
        <img
          src={profileImage}
          alt={`${from}의 프로필`}
          className="w-10 h-10 rounded-full mr-3"
        />
      ) : (
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
          <img src={plusCircle} alt="추가 아이콘" className="w-6 h-6" />
        </div>
      )}
      <div>
        {from ? (
          <>
            <p className="text-gray-500 text-sm mb-1">From. {from}</p>
            <p className="text-gray-700 text-sm mb-2">{text}</p>
            <p className="text-gray-400 text-xs">{date}</p>
          </>
        ) : (
          <p className="text-gray-500 text-sm">새로운 카드 추가</p>
        )}
      </div>
    </div>
  );
}

// PropTypes 설정
Card.propTypes = {
  from: PropTypes.string,
  text: PropTypes.string,
  date: PropTypes.string,
  profileImage: PropTypes.string,
};

// defaultProps 설정
Card.defaultProps = {
  from: '',
  text: '',
  date: '',
  profileImage: null,
};

export default Card;
