import React from "react";
import PropTypes from "prop-types";
import checkIcon from "../../assets/check_Icon.png";

function ColorTile({ cls, onClick, isSelected }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${cls} flex-1 aspect-[1] w-1/4 rounded-lg items-center flex justify-center `}
    >
      {isSelected && (
        <img src={checkIcon} alt="추가 아이콘" className="w-10 h-10" />
      )}
    </button>
  );
}

ColorTile.propTypes = {
  cls: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

export default ColorTile;
