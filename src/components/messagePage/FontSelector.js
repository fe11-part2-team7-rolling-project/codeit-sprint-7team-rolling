import React, { useState } from "react";
import PropTypes from "prop-types";

const fonts = ["Noto Sans", "Arial", "Roboto"];

function FontSelector({ onSelectFont }) {
  const [font, setFont] = useState("Noto Sans");

  const handleFontChange = (e) => {
    setFont(e.target.value);
    onSelectFont(e.target.value);
  };

  return (
    <div className="mb-6 w-[320px] h-[98px] flex flex-col gap-[12px]">
      <label
        htmlFor="FontSelector"
        className="text-[#181818] font-bold text-[24px] leading-[36px] tracking-tight"
      >
        <div className="mb-3">폰트 선택</div>
        <select
          id="FontSelector"
          value={font}
          onChange={handleFontChange}
          className="w-[320px] h-[50px] rounded-[8px] border border-[#CCCCCC] px-4 py-3 text-[#555555] font-normal text-[16px] leading-[26px] tracking-tight"
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
