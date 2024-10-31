import React, { useState } from "react";
import PropTypes from "prop-types";

function TextEditor({ onContentChange, font }) {
  const [content, setContent] = useState("");
  const [textStyle, setTextStyle] = useState({
    isBold: false,
    isItalic: false,
    isUnderline: false,
  });

  const applyStyle = () => {
    const classes = [];
    classes.push(font);
    if (textStyle.isBold) classes.push("font-bold");
    if (textStyle.isItalic) classes.push("italic");
    if (textStyle.isUnderline) classes.push("underline");
    return classes.join(" ");
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    onContentChange(e.target.value);
  };

  return (
    <div className="w-[720px] h-[308px] flex flex-col gap-[12px] mb-6 max-md:w-[320px] max-md:h-[308px]">
      <label htmlFor="TextEditor">
        <div className="text-[#181818] font-bold text-[24px] leading-[36px] tracking-tight mb-3">
          내용을 입력해 주세요
        </div>
        <div>
          <div className="flex gap-[10px] w-[718px] h-[49px] bg-[#EEEEEE] p-1 max-md:w-[320px]">
            <button
              type="button"
              onClick={() =>
                setTextStyle({ ...textStyle, isBold: !textStyle.isBold })
              }
              className={`font-bold ${
                textStyle.isBold ? "bg-gray-200" : ""
              } p-2 rounded`}
            >
              B
            </button>
            <button
              type="button"
              onClick={() =>
                setTextStyle({ ...textStyle, isItalic: !textStyle.isItalic })
              }
              className={`italic ${
                textStyle.isItalic ? "bg-gray-200" : ""
              } p-2 rounded`}
            >
              I
            </button>
            <button
              type="button"
              onClick={() =>
                setTextStyle({
                  ...textStyle,
                  isUnderline: !textStyle.isUnderline,
                })
              }
              className={`underline ${
                textStyle.isUnderline ? "bg-gray-200" : ""
              } p-2 rounded`}
            >
              U
            </button>
          </div>
          <textarea
            id="TextEditor"
            value={content}
            onChange={handleContentChange}
            className={`w-[720px] h-[260px] p-4 border border-[#CCCCCC] rounded-[8px] text-[#181818] text-[16px] leading-[26px] tracking-tight max-md:w-[320px] max-md:h-[260px] ${applyStyle()}`}
            placeholder="I am your rich text editor."
          />
        </div>
      </label>
    </div>
  );
}

TextEditor.propTypes = {
  onContentChange: PropTypes.func.isRequired,
  font: PropTypes.string.isRequired,
};

export default TextEditor;
