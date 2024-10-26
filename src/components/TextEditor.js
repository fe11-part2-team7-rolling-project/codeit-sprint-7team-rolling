import React, { useState } from "react";

const TextEditor = () => {
  const [content, setContent] = useState("");

  return (
    <div>
      <label>내용을 입력해 주세요</label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ width: "100%", height: "150px", ...applyStyle() }}
      />
    </div>
  );
};

export default TextEditor;
