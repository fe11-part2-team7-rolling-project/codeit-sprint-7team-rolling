import React, { useState } from "react";

function FromInput() {
  const [value, setValue] = useState("");
  const [error, SetError] = useState(false);

  const handleBlur = () => {
    if (!value) {
      SetError(true);
    }
  };
  return (
    <div>
      <label htmlFor="FromInput">
        From.
        <input
          value={value}
          type="text"
          onChange={(e) => {
            setValue(e.target.value);
            SetError(false);
          }}
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

export default FromInput;
