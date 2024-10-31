import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

function ProfileImageSelector({ onSelectImage }) {
  const defaultImageUrl =
    "https://learn-codeit-kr-static.s3.ap-northeast-2.amazonaws.com/sprint-proj-image/default_avatar.png";
  const [selectedImage, setSelectedImage] = useState(defaultImageUrl); // 기본 이미지 URL을 초기값으로 설정
  const [imageUrls, setImageUrls] = useState([]);

  // 외부 API에서 이미지 URL 가져오기
  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        const response = await fetch(
          "https://rolling-api.vercel.app/profile-images/"
        );
        if (response.ok) {
          const data = await response.json();
          // 기본 이미지 URL을 제외한 나머지를 상태에 저장
          const filteredImages = data.imageUrls.filter(
            (url) => url !== defaultImageUrl
          );
          setImageUrls(filteredImages);
        } else {
          console.error("Failed to fetch image URLs:", response.status);
        }
      } catch (error) {
        console.error("Error fetching image URLs:", error);
      }
    };

    fetchImageUrls();
  }, []);

  const handleImageSelect = (image) => {
    setSelectedImage(image);
    onSelectImage(image); // 부모 컴포넌트에 선택한 이미지 URL 전달
  };

  return (
    <div className="mb-6">
      <label htmlFor="ProfileImageSelector">
        <div className="mb-4 block text-2xl font-bold">프로필 이미지</div>

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
              {imageUrls.map((image, index) => (
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
