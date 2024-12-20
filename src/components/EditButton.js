import React from "react";
import PropTypes from "prop-types";

function EditButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="px-4 py-2 h-10 bg-purple500 text-white font-regular rounded-md shadow-md hover:bg-purple600"
    >
      Edit
    </button>
  );
}

EditButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default EditButton;
