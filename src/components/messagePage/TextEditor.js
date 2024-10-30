import React, { useState } from "react";
import PropTypes from "prop-types";

function TextEditor({ onContentChange }) {
  const [content, setContent] = useState("");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const applyStyle = () => {
    let style = "";
    if (isBold) style += "font-weight: bold; ";
    if (isItalic) style += "font-style: italic; ";
    if (isUnderline) style += "text-decoration: underline; ";
    return style;
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
              onClick={() => setIsBold(!isBold)}
              className={`font-bold ${isBold ? "bg-gray-200" : ""} p-2 rounded`}
            >
              B
            </button>
            <button
              type="button"
              onClick={() => setIsItalic(!isItalic)}
              className={`italic ${isItalic ? "bg-gray-200" : ""} p-2 rounded`}
            >
              I
            </button>
            <button
              type="button"
              onClick={() => setIsUnderline(!isUnderline)}
              className={`underline ${
                isUnderline ? "bg-gray-200" : ""
              } p-2 rounded`}
            >
              U
            </button>
          </div>
          <textarea
            id="TextEditor"
            value={content}
            onChange={handleContentChange}
            className="w-[720px] h-[178px] p-4 border border-[#CCCCCC] text-[#181818] font-normal text-[16px] leading-[26px] tracking-tight"
            style={{ ...applyStyle() }}
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
