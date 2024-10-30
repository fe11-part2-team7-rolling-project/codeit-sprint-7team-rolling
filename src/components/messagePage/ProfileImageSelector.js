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
    <div className="mb-6">
      <label
        htmlFor="ProfileImageSelector"
        className="block text-2xl font-semibold mb-2"
      >
        <div className="mb-4">프로필 이미지</div>

        <div className="flex items-center gap-8">
          <div>
            <img
              src={selectedImage}
              alt="Profile"
              className="w-16 h-16 rounded-full"
            />
          </div>
          <div>
            <p className="text-gray500 text-sm">
              프로필 이미지를 선택해 주세요!
            </p>
            <div className="flex gap-4 mt-2">
              {imagePaths.map((image, index) => (
                <button
                  type="button"
                  key={image}
                  onClick={() => handleImageSelect(image)}
                  className={`rounded-full p-0 border-none ${
                    selectedImage === image
                      ? "border-purple-500"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={image}
                    alt={`Profile ${index + 1}`}
                    className="w-12 h-12 rounded-full"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </label>
    </div>
  );
}

ProfileImageSelector.propTypes = {
  onSelectImage: PropTypes.func.isRequired,
};

export default ProfileImageSelector;
