import React, { useState } from "react";

function TextEditor() {
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

  return (
    <div>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label>내용을 입력해 주세요</label>
      <div>
        {/* eslint-disable-next-line react/button-has-type */}
        <button
          onClick={() => setIsBold(!isBold)}
          style={{ fontWeight: "bold" }}
        >
          B
        </button>
        {/* eslint-disable-next-line react/button-has-type */}
        <button
          onClick={() => setIsItalic(!isItalic)}
          style={{ fontStyle: "italic" }}
        >
          I
        </button>
        {/* eslint-disable-next-line react/button-has-type */}
        <button
          onClick={() => setIsUnderline(!isUnderline)}
          style={{ textDecoration: "underline" }}
        >
          U
        </button>
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ width: "100%", height: "150px", ...applyStyle() }}
      />
    </div>
  );
}

export default TextEditor;
