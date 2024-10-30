import React, { useState } from "react";
import FromInput from "../components/messagePage/FromInput";
import ProfileImageSelector from "../components/messagePage/ProfileImageSelector";
import RelationSelector from "../components/messagePage/RelationSelector";
import TextEditor from "../components/messagePage/TextEditor";
import FontSelector from "../components/messagePage/FontSelector";
import CreateButton from "../components/messagePage/CreateButton";
import Logo from "../components/Layout/Logo";

function PostHeader() {
  return (
    <header className="bg-white shadow-md w-full py-4 px-6 md:px-24 lg:px-48">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Logo />
      </div>
    </header>
  );
}

function MessagePage() {
  const [from, setFrom] = useState("");
  const [content, setContent] = useState("");
  const [relation, setRelation] = useState("지인"); // 기본값 설정
  const [font, setFont] = useState("Noto Sans"); // 기본 폰트 설정
  const [profileImageURL, setProfileImageURL] = useState(""); // 기본 프로필 이미지 설정

  return (
    <div className="bg-gray-100 min-h-screen">
      <PostHeader />
      <div>
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
    </div>
  );
}

export default MessagePage;
