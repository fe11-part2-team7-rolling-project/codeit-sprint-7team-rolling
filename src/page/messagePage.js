import React, { useState } from "react";
import FromInput from "../components/FromInput";
import ProfileImageSelector from "../components/ProfileImageSelector";
import RelationSelector from "../components/RelationSelector";
import TextEditor from "../components/TextEditor";
import FontSelector from "../components/FontSelector";
import CreateButton from "../components/CreateButton";

const MessagePage = () => {
  const [from, setFrom] = useState("");
  const [content, setContent] = useState("");

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Rolling</h1>

      {/* From Input */}
      <FromInput onInputChange={setFrom} />

      {/* Profile Image Selector */}
      <ProfileImageSelector />

      {/* Relation Selector */}
      <RelationSelector />

      {/* Text Editor */}
      <TextEditor onContentChange={setContent} />

      {/* Font Selector */}
      <FontSelector />

      {/* Create Button */}
      <CreateButton from={from} content={content} />
    </div>
  );
};

export default MessagePage;
