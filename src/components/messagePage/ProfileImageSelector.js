import React, { useState } from "react";
import PropTypes from "prop-types";
import profileImg01 from "../../assets/php1.svg";
import profileImg02 from "../../assets/php2.svg";
import profileImg03 from "../../assets/php3.svg";
import defaultProfile from "../../assets/default_profile.svg";

function ProfileImageSelector({ onSelectImage }) {
  const [selectedImage, setSelectedImage] = useState(defaultProfile);
  const imagePaths = [profileImg01, profileImg02, profileImg03];

  const handleImageSelect = (image) => {
    setSelectedImage(image);
    onSelectImage(image); // 부모 컴포넌트에 전달
  };

  return (
    <div>
      <label htmlFor="profile">
        프로필 이미지
        <div>
          <img
            src={selectedImage}
            alt="Profile"
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          />
        </div>
        <p>프로필 이미지를 선택해 주세요!</p>
        <div style={{ display: "flex", gap: "10px" }}>
          {imagePaths.map((image, index) => (
            <button
              type="button"
              key={image}
              onClick={() => handleImageSelect(image)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleImageSelect(image);
                }
              }}
              style={{
                border: "none",
                background: "none",
                padding: 0,
                cursor: "pointer",
                outline: selectedImage === image ? "2px solid #000" : "none",
              }}
            >
              <img
                src={image}
                alt={`Profile ${index + 1}`}
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                }}
              />
            </button>
          ))}
        </div>
      </label>
    </div>
  );
}

ProfileImageSelector.propTypes = {
  onSelectImage: PropTypes.func.isRequired,
};

export default ProfileImageSelector;
