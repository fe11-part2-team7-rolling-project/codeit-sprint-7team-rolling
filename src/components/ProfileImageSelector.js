import React, { useState } from "react";
import profileImg01 from "../img/profile_img_01.svg";
import profileImg02 from "../img/profile_img_02.svg";
import profileImg03 from "../img/profile_img_03.svg";
import defaultProfile from "../img/default_profile.svg";

const ProfileImageSelector = () => {
  const [selectedImage, setSelectedImage] = useState(defaultProfile);
  const imagePaths = [profileImg01, profileImg02, profileImg03];

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  return (
    <div>
      <label>프로필 이미지</label>
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
          <img
            key={index}
            src={image}
            alt={`Profile ${index + 1}`}
            onClick={() => handleImageSelect(image)}
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              cursor: "pointer",
              border: selectedImage === image ? "2px solid #000" : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileImageSelector;
