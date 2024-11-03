// src/components/DeleteButton.js
import React from 'react';
import PropTypes from 'prop-types';

function DeleteButton({ label = '삭제하기', className = '', onClick }) {
  return (
    <button onClick={onClick} type="button" className={`bg-purple500 text-white p-2 rounded ${className}`}>
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
