import React, { useState } from "react";
import FromInput from "../components/FromInput";
import ProfileImageSelector from "../components/ProfileImageSelector";
import RelationSelector from "../components/RelationSelector";
import TextEditor from "../components/TextEditor";
import FontSelector from "../components/FontSelector";
import CreateButton from "../components/CreateButton";

function MessagePage() {
  const [from, setFrom] = useState("");
  const [content, setContent] = useState("");
  const [relation, setRelation] = useState("지인"); // 기본값 설정
  const [font, setFont] = useState("Noto Sans"); // 기본 폰트 설정
  const [profileImageURL, setProfileImageURL] = useState(""); // 기본 프로필 이미지 설정

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Rolling</h1>

      {/* From Input */}
      <FromInput onInputChange={setFrom} />

      {/* Profile Image Selector */}
      <ProfileImageSelector onSelectImage={setProfileImageURL} />

      {/* Relation Selector */}
      <RelationSelector onSelectRelation={setRelation} />

      {/* Text Editor */}
      <TextEditor onContentChange={setContent} />

      {/* Font Selector */}
      <FontSelector onSelectFont={setFont} />

      {/* Create Button */}
      <CreateButton
        from={from}
        content={content}
        relation={relation}
        font={font}
        profileImageURL={profileImageURL}
      />
    </div>
  );
}

export default MessagePage;
