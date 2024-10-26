import React, { useState } from "react";

const FontSelector = () => {
  const [font, setFont] = useState("Noto Sans");
  const fonts = ["Noto Sans", "Arial", "Roboto"];

  return (
    <div>
      <label>폰트 선택</label>
      <select value={font} onChange={(e) => setFont(e.target.value)}>
        {fonts.map((font) => (
          <option key={font} value={font}>
            {font}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FontSelector;
