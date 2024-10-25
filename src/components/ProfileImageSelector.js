import React, { useState } from "react";

const ProfileImageSelector = () => {
  const [selectedImage, setSelectedImage] = useState("");

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
      <div style={{ display: "flex", gap: "10px" }}></div>
    </div>
  );
};

export default ProfileImageSelector;
