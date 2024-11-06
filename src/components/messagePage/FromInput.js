import React, { useState } from "react";
import PropTypes from "prop-types";
import "react-toastify/dist/ReactToastify.css";

function FromInput({ onInputChange, IsOver }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState({
    isNotInput: false,
    isOver40: false,
  });

  const handleBlur = () => {
    setError((prevError) => ({
      ...prevError,
      isNotInput: !value,
    }));
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;

    if (inputValue.length > 40) {
      setError((prevError) => ({
        ...prevError,
        isOver40: true,
      }));
      IsOver(true); // 40자를 초과하면 IsOver를 true로 설정
    } else {
      // 입력 값이 40자 이하일 경우 isOver40을 false로 초기화
      setError((prevError) => ({
        ...prevError,
        isOver40: false,
      }));
      IsOver(false); // 정상 입력일 경우 IsOver를 false로 설정
    }

    setValue(inputValue);
    setError((prevError) => ({
      ...prevError,
      isNotInput: !value,
    }));
    onInputChange(inputValue);
    IsOver(error.isOver40);
  };

  return (
    <div className="w-[720px] h-[98px] flex flex-col gap-3 max-md:w-[320px] max-md:gap-[12px]">
      <label htmlFor="FromInput" className="flex flex-col gap-3">
        <h1 className="text-[#181818] dark:text-gray200 font-bold text-[24px] leading-[36px] tracking-tight max-md:text-[24px] max-md:leading-[36px]">
          From.
        </h1>

        <input
          value={value}
          type="text"
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="이름을 입력해 주세요."
          className="w-[720px] h-[50px] dark:bg-dark4 dark:text-gray300 rounded-[8px] border border-[#CCCCCC] px-4 py-3 text-[#555555] font-normal text-[16px] leading-[26px] tracking-tight placeholder:text-[#555555] placeholder:font-normal placeholder:text-[16px] placeholder:leading-[26px] max-md:w-[320px] max-md:h-[50px] max-md:px-[16px] max-md:py-[12px]"
        />
        {error.isNotInput && (
          <span className="text-error text-sm max-md:text-xs">
            값을 입력해 주세요.
          </span>
        )}
        {error.isOver40 && (
          <span className="text-error text-sm max-md:text-xs">
            입력은 40자 이하여야 합니다.
          </span>
        )}
      </label>
    </div>
  );
}

FromInput.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  IsOver: PropTypes.bool.isRequired,
};

export default FromInput;
