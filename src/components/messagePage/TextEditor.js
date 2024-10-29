import React, { useState } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
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
    onContentChange(e.target.value); // 부모 컴포넌트에 전달
  };

  return (
    <div>
      <label htmlFor="textContent">
        내용을 입력해 주세요
        <div>
          <button
            type="button"
            onClick={() => setIsBold(!isBold)}
            style={{ fontWeight: "bold" }}
          >
            B
          </button>
          <button
            type="button"
            onClick={() => setIsItalic(!isItalic)}
            style={{ fontStyle: "italic" }}
          >
            I
          </button>
          <button
            type="button"
            onClick={() => setIsUnderline(!isUnderline)}
            style={{ textDecoration: "underline" }}
          >
            U
          </button>
        </div>
        <textarea
          value={content}
          onChange={handleContentChange}
          style={{ width: "100%", height: "150px", ...applyStyle() }}
        />
      </label>
    </div>
  );
}

TextEditor.propTypes = {
  onContentChange: PropTypes.func.isRequired,
};

export default TextEditor;
