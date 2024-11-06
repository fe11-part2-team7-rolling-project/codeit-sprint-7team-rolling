import React from "react";
import PropTypes from "prop-types";

function SubmitButton({ disabled, text }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`w-full rounded-xl py-4 font-bold text-white mt-20 ${
        disabled
          ? "bg-gray300 cursor-not-allowed dark:bg-gray400"
          : "bg-purple600"
      }`}
    >
      {text}
    </button>
  );
}

SubmitButton.propTypes = {
  disabled: PropTypes.bool,
  text: PropTypes.string.isRequired,
};

SubmitButton.defaultProps = {
  disabled: false,
};

export default SubmitButton;
