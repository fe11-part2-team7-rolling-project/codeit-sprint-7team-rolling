import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

function CreateButton({ from, content, relation, font, profileImageURL }) {
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    setIsDisabled(!(from && content));
  }, [from, content]);

  const handleSubmit = async () => {
    if (!isDisabled) {
      const id = 9144;
      try {
        const response = await fetch(
          `https://rolling-api.vercel.app/11-7/recipients/${id}/messages/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              team: "11-7",
              recipientId: id, // 정수로 전달
              sender: from,
              relationship: relation,
              content,
              font,
              profileImageURL,
            }),
          }
        );
        if (response.ok) {
          window.location.href = `/post/${id}`;
        } else {
          const errorData = await response.json();
          console.error("POST 요청 실패:", response.status, errorData);
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
          ? "bg-[#CCCCCC] cursor-not-allowed"
          : "bg-[#9935FF] hover:bg-[#861DEE] active:bg-[#6E0AD1] focus:bg-[#6E0AD1]"
      } mb-10`}
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
