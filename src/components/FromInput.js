import React, { useState } from "react";

const FromInput = () => {
  const [value, setValue] = useState("");

  return (
    <div>
      <label>From.</label>
      <input
        value={value}
        type="text"
        onChange={(e) => {
          setValue(e.target.value);
          SetError(false);
        }}
        placeholder="이름을 입력해 주세요."
      />
    </div>
  );
};

export default FromInput;
