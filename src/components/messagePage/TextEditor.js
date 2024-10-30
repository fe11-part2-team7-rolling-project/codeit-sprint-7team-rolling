import React, { useState } from "react";
import PropTypes from "prop-types";

function TextEditor({ onContentChange }) {
  const [content, setContent] = useState("");
  const [textStyle, setTextStyle] = useState({
    isBold: false,
    isItalic: false,
    isUnderline: false,
  });

  const applyStyle = () => {
    const classes = [];
    classes.push(textStyle.isBold ? "font-bold" : "font-thin"); // Bold or thin
    if (textStyle.isItalic) classes.push("italic"); // Italic if active
    if (textStyle.isUnderline) classes.push("underline"); // Underline if active
    return classes.join(" ");
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    onContentChange(e.target.value);
  };

  return (
    <div className="mb-6 w-[720px] h-[260px] flex flex-col gap-[12px]">
      <label
        htmlFor="TextEditor"
        className="text-[#181818] font-bold text-[24px] leading-[36px] tracking-tight"
      >
        <div className="mb-3">내용을 입력해 주세요</div>
        <div>
          <div className="flex gap-[10px] w-[718px] h-[49px] bg-[#EEEEEE] p-1">
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
            className={`w-[720px] h-[178px] p-4 border border-[#CCCCCC] text-[#181818] text-[16px] leading-[26px] tracking-tight ${applyStyle()}`}
            placeholder="I am your reach text editor."
          />
        </div>
      </label>
    </div>
  );
}

TextEditor.propTypes = {
  onContentChange: PropTypes.func.isRequired,
};

export default TextEditor;
