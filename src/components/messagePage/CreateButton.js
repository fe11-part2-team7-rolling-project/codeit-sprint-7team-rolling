import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

function CreateButton({ from, content, relation, font, profileImageURL }) {
  const { Id } = useParams(); // URL에서 id 값을 가져옴
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    setIsDisabled(!(from && content));
  }, [from, content]);

  const handleSubmit = async () => {
    if (!isDisabled) {
      try {
        const response = await fetch(
          `https://rolling-api.vercel.app/11-7/recipients/${Id}/messages/`, // URL의 id 사용
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              team: "11-7",
              recipientId: Id, // URL에서 가져온 id 전달
              sender: from,
              relationship: relation,
              content,
              font,
              profileImageURL,
            }),
          }
        );

        // 응답 내용을 로그로 출력하여 HTML 오류 페이지인지 확인
        console.log("Response status:", response.status);
        console.log("Response headers:", response.headers);
        const responseBody = await response.text();
        console.log("Response body:", responseBody);

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
