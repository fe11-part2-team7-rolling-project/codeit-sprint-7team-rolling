import PropTypes from "prop-types";
import React from "react";

function ColorSelector({ isColor, colorSelected }) {
  return (
    <>
      <h2 className="text-xl font-bold mb-2">배경화면을 선택해 주세요.</h2>
      <div className="mb-7 font-regular">
        컬러를 선택하거나, 이미지를 선택할 수 있습니다.
      </div>
      <div className="flex flex-row mb-[50px] gap-1">
        <button
          type="button"
          className={`py-2 rounded-lg w-[122px] border-2 ${
            isColor
              ? "text-purple600 dark:bg-dark4 border-purple600 font-bold"
              : "bg-gray200 dark:bg-dark4 dark:border-gray600 font-regular dark:text-gray500 border-gray200"
          }`}
          onClick={() => colorSelected(true)}
        >
          컬러
        </button>
        <button
          type="button"
          className={`py-2 rounded-lg w-[122px] border-2 ${
            !isColor
              ? "text-purple600 dark:bg-dark4 border-purple600 font-bold"
              : "bg-gray200 dark:bg-dark4 dark:border-gray600 dark:text-gray500 font-regular border-gray200"
          }`}
          onClick={() => colorSelected(false)}
        >
          이미지
        </button>
      </div>
    </>
  );
}

ColorSelector.propTypes = {
  isColor: PropTypes.bool.isRequired,
  colorSelected: PropTypes.func.isRequired,
};

export default ColorSelector;
