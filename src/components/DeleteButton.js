// src/components/DeleteButton.js
import React from 'react';
import PropTypes from 'prop-types';

function DeleteButton({ label = '삭제하기', className = '', onClick }) {
  return (
    <button onClick={onClick} type="button" className={`w-full sm:w-80 px-4 py-2 md:px-6 md:py-3 text-white bg-purple500 rounded-md shadow-md hover:bg-purple600 transition ${className}`}>
      {label}
    </button>
  );
}

DeleteButton.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

// 기본값 설정
DeleteButton.defaultProps = {
  label: '삭제하기',
  className: '',
};

export default DeleteButton;
