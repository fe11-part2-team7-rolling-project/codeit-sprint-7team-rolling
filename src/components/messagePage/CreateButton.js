import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

function CreateButton({ from, content, relation, font, profileImageURL }) {
  const { Id } = useParams();
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    setIsDisabled(!(from && content));
  }, [from, content]);

  const handleSubmit = async () => {
    if (!profileImageURL || profileImageURL.includes("default_avatar")) {
      alert("프로필 이미지를 선택해주세요.");
      return;
    }
    if (!isDisabled) {
      try {
        const response = await fetch(
          `https://rolling-api.vercel.app/11-7/recipients/${Id}/messages/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              team: "11-7",
              recipientId: Id,
              sender: from,
              relationship: relation,
              content,
              font,
              profileImageURL,
            }),
          }
        );
        if (response.ok) {
          window.location.href = `/post/${Id}`;
        } else {
          console.error("POST 요청 실패:", response.status);
        }
      } catch (error) {
        console.error("POST 요청 중 오류 발생:", error);
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleSubmit}
      disabled={isDisabled}
      className={`w-[720px] h-[56px] text-white font-semibold rounded-[12px] px-[24px] py-[14px] ${
        isDisabled
          ? "bg-[#CCCCCC] cursor-not-allowed dark:bg-gray400"
          : "bg-[#9935FF] hover:bg-[#861DEE] active:bg-[#6E0AD1] focus:bg-[#6E0AD1]"
      } mb-10 max-md:w-[320px] max-md:h-[56px]`}
    >
      생성하기
    </button>
  );
}
CreateButton.propTypes = {
  from: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  relation: PropTypes.string.isRequired,
  font: PropTypes.string.isRequired,
  profileImageURL: PropTypes.string.isRequired,
};

export default CreateButton;
