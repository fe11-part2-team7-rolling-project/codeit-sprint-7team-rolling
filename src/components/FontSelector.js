import React, { useState } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from "prop-types";

const fonts = ["Noto Sans", "Arial", "Roboto"];

function FontSelector({ onSelectFont }) {
  const [font, setFont] = useState("Noto Sans");

  const handleFontChange = (e) => {
    setFont(e.target.value);
    onSelectFont(e.target.value); // 부모 컴포넌트에 전달
  };

  return (
    <div>
      <label htmlFor="fontname">
        폰트 선택
        <select
          value={font}
          onChange={handleFontChange}
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

FontSelector.propTypes = {
  onSelectFont: PropTypes.func.isRequired,
};

export default FontSelector;
