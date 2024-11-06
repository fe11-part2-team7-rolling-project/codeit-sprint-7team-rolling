import React from "react";
import PropTypes from "prop-types";
import checkIcon from "../../assets/check_Icon.png";

function ImageTile({ onClick, link, isSelected }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex-1 aspect-[1] w-1/4 items-center flex justify-center relative"
    >
      <img className="w-full h-full rounded-lg" alt={link} src={link} />

      {isSelected && (
        <img src={checkIcon} alt="추가 아이콘" className="w-10 h-10 absolute" />
      )}
    </button>
  );
}

ImageTile.propTypes = {
  onClick: PropTypes.func.isRequired,
  link: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

export default ImageTile;
