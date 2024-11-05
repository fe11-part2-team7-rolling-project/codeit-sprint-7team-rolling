import React, { useState, useMemo, useCallback } from "react";
import FromInput from "../components/messagePage/FromInput";
import ProfileImageSelector from "../components/messagePage/ProfileImageSelector";
import RelationSelector from "../components/messagePage/RelationSelector";
import TextEditor from "../components/messagePage/TextEditor";
import FontSelector from "../components/messagePage/FontSelector";
import CreateButton from "../components/messagePage/CreateButton";
import Logo from "../components/Layout/Logo";
import ToggleButton from "../components/Layout/ToggleButton";

// React.memo를 사용하여 각 컴포넌트를 최적화하여 불필요한 리렌더링을 방지
const MemoizedFromInput = React.memo(FromInput);
const MemoizedProfileImageSelector = React.memo(ProfileImageSelector);
const MemoizedRelationSelector = React.memo(RelationSelector);
const MemoizedTextEditor = React.memo(TextEditor);
const MemoizedFontSelector = React.memo(FontSelector);
const MemoizedCreateButton = React.memo(CreateButton);

function PostHeader() {
  return (
    <header className="bg-white dark:bg-dark2 shadow-md w-full py-4 px-6 md:px-24 lg:px-48">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Logo />
        <div className="flex-shrink-0 ml-auto">
          <ToggleButton/>
        </div>
      </div>
    </header>
  );
}
const MemoizedLogo = React.memo(PostHeader);

function MessagePage() {
  const [from, setFrom] = useState("");
  const [content, setContent] = useState("");
  const [relation, setRelation] = useState("지인");
  const [font, setFont] = useState("Noto Sans");
  const [profileImageURL, setProfileImageURL] = useState("");

  const fontClasses = useMemo(
    () => ({
      "Noto Sans": "font-noto",
      Pretendard: "font-pretendard",
      나눔명조: "font-custom",
      "나눔손글씨 손편지체": "font-custom",
    }),
    []
  );

  // API 전송용 폰트 이름 매핑 객체 추가
  const fontApiValues = {
    "Noto Sans": "Noto Sans",
    Pretendard: "Pretendard",
    나눔명조: "나눔명조",
    "나눔손글씨 손편지체": "나눔손글씨 손편지체",
  };

  const fontClass = fontClasses[font] || "font-custom";
  const fontForApi = fontApiValues[font] || "Noto Sans"; // API에 사용할 폰트 이름

  const handleFromChange = useCallback((value) => setFrom(value), []);
  const handleContentChange = useCallback((value) => setContent(value), []);
  const handleRelationChange = useCallback((value) => setRelation(value), []);
  const handleFontChange = useCallback((value) => setFont(value), []);
  const handleProfileImageChange = useCallback(
    (value) => setProfileImageURL(value),
    []
  );
  
  return (
    <div className="bg-gray-100 dark:bg-dark1 min-h-screen flex flex-col items-center gap-10">
      <MemoizedLogo />
      <div className={`w-[720px] flex flex-col gap-10 ${fontClass} max-md:w-[320px]`}>
        {/* From Input */}
        <MemoizedFromInput onInputChange={handleFromChange} />

        {/* Profile Image Selector */}
        <MemoizedProfileImageSelector onSelectImage={handleProfileImageChange} />

        {/* Relation Selector */}
        <MemoizedRelationSelector onSelectRelation={handleRelationChange} />

        {/* Text Editor */}
        <MemoizedTextEditor onContentChange={handleContentChange} font={fontClass} />

        {/* Font Selector */}
        <MemoizedFontSelector onSelectFont={handleFontChange} />

        {/* Create Button */}
        <MemoizedCreateButton
          from={from}
          content={content}
          relation={relation}
          font={fontForApi} 
          profileImageURL={profileImageURL}
        />
      </div>
    </div>
  );
}

export default MessagePage;
