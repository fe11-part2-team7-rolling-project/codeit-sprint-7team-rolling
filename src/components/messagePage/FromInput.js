import React, { useState } from "react";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FromInput({ onInputChange }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const handleBlur = () => {
    if (!value) setError(true);
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;

    if (inputValue.length > 40) {
      toast.error("입력은 40자 이하여야 합니다.");
      return;
    }

    setValue(inputValue);
    setError(false);
    onInputChange(inputValue);
  };

  return (
    <div className="w-[720px] h-[98px] flex flex-col gap-3 max-md:w-[320px] max-md:gap-[12px]">
      <label htmlFor="FromInput">
        <div className="text-[#181818] font-bold text-[24px] leading-[36px] tracking-tight max-md:text-[24px] max-md:leading-[36px]">
          From.
        </div>

        <input
          value={value}
          type="text"
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="이름을 입력해 주세요."
          className="w-[720px] h-[50px] rounded-[8px] border border-[#CCCCCC] px-4 py-3 text-[#555555] font-normal text-[16px] leading-[26px] tracking-tight placeholder:text-[#555555] placeholder:font-normal placeholder:text-[16px] placeholder:leading-[26px] max-md:w-[320px] max-md:h-[50px] max-md:px-[16px] max-md:py-[12px]"
        />
        {error && (
          <span className="text-error text-sm max-md:text-xs">
            값을 입력해 주세요.
          </span>
        )}
      </label>
      <ToastContainer position="bottom-center" />
    </div>
  );
}

FromInput.propTypes = {
  onInputChange: PropTypes.func.isRequired,
};

export default FromInput;
