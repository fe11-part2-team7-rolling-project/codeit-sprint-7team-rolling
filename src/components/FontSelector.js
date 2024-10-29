import React, { useState } from "react";

const fonts = ["Noto Sans", "Arial", "Roboto"];

function FontSelector() {
  const [font, setFont] = useState("Noto Sans");

  return (
    <div>
      <label htmlFor="fontname">
        폰트 선택
        <select
          value={font}
          onChange={(e) => setFont(e.target.value)}
          id="fontname"
          name="fontname"
        >
          {fonts.map((fontOption) => (
            <option key={fontOption} value={fontOption}>
              {fontOption}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default FontSelector;
