import React, { useState } from 'react';
import PropTypes from 'prop-types';
import enabledIcon from '../assets/trashbin/enabled.svg';
import hoverIcon from '../assets/trashbin/hover.svg';
import focusIcon from '../assets/trashbin/focus.svg';
import activeIcon from '../assets/trashbin/pressed.svg';
import disabledIcon from '../assets/trashbin/disabled.svg';

const trashBinImages = {
  enabled: enabledIcon,
  hover: hoverIcon,
  focus: focusIcon,
  active: activeIcon,
  disabled: disabledIcon,
};

function TrashIcon({ onDelete, isDisabled = false }) {
  const [iconState, setIconState] = useState('enabled');

  const handleMouseEnter = () => !isDisabled && setIconState('hover');
  const handleMouseLeave = () => !isDisabled && setIconState('enabled');
  const handleFocus = () => !isDisabled && setIconState('focus');
  const handleBlur = () => !isDisabled && setIconState('enabled'); 
  const handleClick = () => {
    if (!isDisabled) {
      setIconState('active');
      onDelete();
    }
  };

  return (
    <button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={handleClick}
      disabled={isDisabled}
      tabIndex={0}
      type="button"
      className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
      }}
    >
      <img
        src={trashBinImages[iconState]}
        alt="Trash Bin Icon"
        className="w-full h-full"
      />
    </button>
  );
}

TrashIcon.propTypes = {
  onDelete: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
};

TrashIcon.defaultProps = {
  isDisabled: false,
};

export default TrashIcon;
