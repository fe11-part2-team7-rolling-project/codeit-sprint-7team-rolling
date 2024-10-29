import React, { useState, useEffect } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from "prop-types";

function CreateButton({ from, content, relation, font, profileImageURL }) {
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (from && content) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [from, content]);

  const handleSubmit = async () => {
    if (!isDisabled) {
      const id = Math.random().toString(36).substr(2, 9); // 임시 ID 생성
      try {
        const response = await fetch(
          `https://rolling-api.vercel.app/11-7/recipients/${id}/messages/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
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
          console.error("POST 요청 실패:", response.status);
        }
      } catch (error) {
        console.error("POST 요청 중 오류 발생:", error);
      }
    }
  };

  return (
    <button type="button" onClick={handleSubmit} disabled={isDisabled}>
      생성하기
    </button>
  );
}

// Correct usage of PropTypes
CreateButton.propTypes = {
  from: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  relation: PropTypes.string.isRequired,
  font: PropTypes.string.isRequired,
  profileImageURL: PropTypes.string.isRequired,
};

export default CreateButton;
