import React, { useState } from "react";
import PropTypes from "prop-types";

function FromInput({ onInputChange }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const handleBlur = () => {
    if (!value) setError(true);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    setError(false);
    onInputChange(e.target.value);
  };

  return (
    <div className="w-[720px] h-[98px] flex flex-col gap-3">
      <label
        htmlFor="FromInput"
        className="text-[#181818] font-bold text-[24px] leading-[36px] tracking-tight"
      >
        From.
        <input
          value={value}
          type="text"
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="이름을 입력해 주세요."
          className="w-[720px] h-[50px] rounded-[8px] border border-[#CCCCCC] px-4 py-3 text-[#555555] font-normal text-[16px] leading-[26px] tracking-tight placeholder:text-[#555555] placeholder:font-normal placeholder:text-[16px] placeholder:leading-[26px] placeholder:tracking-tight"
        />
        {error && (
          <span className="text-error text-sm">값을 입력해 주세요.</span>
        )}
      </label>
    </div>
  );
}

FromInput.propTypes = {
  onInputChange: PropTypes.func.isRequired,
};

export default FromInput;
