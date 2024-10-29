// src/components/UI/Toast.js
import React from 'react';
import PropTypes from 'prop-types';

function Toast({ message }) {
  return (
    <div className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-lg shadow-lg z-50">
      {message}
    </div>
  );
}

Toast.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Toast;
