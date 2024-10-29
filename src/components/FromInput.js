import React, { useState } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from "prop-types";

function FromInput({ onInputChange }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const handleBlur = () => {
    if (!value) {
      setError(true);
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    setError(false);
    onInputChange(e.target.value); // 부모 컴포넌트에 전달
  };

  return (
    <div>
      <label htmlFor="FromInput">
        From.
        <input
          value={value}
          type="text"
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="이름을 입력해 주세요."
          name="FromInput"
          className={error ? "input-error" : ""}
        />
      </label>
      {error && <span className="input-error">값을 입력해 주세요.</span>}
    </div>
  );
}

FromInput.propTypes = {
  onInputChange: PropTypes.func.isRequired,
};

export default FromInput;
