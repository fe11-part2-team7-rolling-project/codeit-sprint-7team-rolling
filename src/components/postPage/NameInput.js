import React from "react";
import PropTypes from "prop-types";

function NameInput({ name, handleChangeName, handleFocusout, isError }) {
  return (
    <>
      <h2 className="text-xl font-bold mb-4">To.</h2>
      <input
        type="text"
        value={name}
        onChange={handleChangeName}
        placeholder="받는 사람 이름을 입력해주세요"
        onBlur={handleFocusout}
        className={`w-full border-2 font-regular rounded-lg px-4 py-2 mb-2 focus:outline-none dark:bg-dark4 ${
          isError ? "border-error" : "border-gray300"
        }`}
      />
      <p
        className={`text-error mb-3 text-sm mb-[30px] ${
          isError ? "visible" : "invisible"
        }`}
      >
        값을 입력해 주세요
      </p>
    </>
  );
}

NameInput.propTypes = {
  name: PropTypes.string.isRequired,
  handleChangeName: PropTypes.func.isRequired,
  handleFocusout: PropTypes.func.isRequired,
  isError: PropTypes.bool.isRequired,
};

export default NameInput;
