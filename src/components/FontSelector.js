import React, { useState } from "react";

function FontSelector() {
  const [font, setFont] = useState("Noto Sans");
  const fonts = ["Noto Sans", "Arial", "Roboto"];

  return (
    <div>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label>폰트 선택</label>
      <select value={font} onChange={(e) => setFont(e.target.value)}>
        {/* eslint-disable-next-line no-shadow */}
        {fonts.map((font) => (
          <option key={font} value={font}>
            {font}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FontSelector;
