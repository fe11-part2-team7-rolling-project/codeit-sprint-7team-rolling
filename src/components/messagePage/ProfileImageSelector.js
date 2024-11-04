import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

function ProfileImageSelector({ onSelectImage }) {
  const defaultImageUrl =
    "https://learn-codeit-kr-static.s3.ap-northeast-2.amazonaws.com/sprint-proj-image/default_avatar.png";
  const [selectedImage, setSelectedImage] = useState(defaultImageUrl);
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        const response = await fetch(
          "https://rolling-api.vercel.app/profile-images/"
        );
        if (response.ok) {
          const data = await response.json();
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
    onSelectImage(image);
  };

  return (
    <div className="w-[720px] max-md:w-[320px] flex flex-col gap-3 mb-6">
      <label htmlFor="ProfileImageSelector" className="flex flex-col gap-3">
        <h1 className="text-[#181818] dark:text-gray200 font-bold text-[24px] leading-[36px] tracking-tight">
          프로필 이미지
        </h1>
        <div className="flex items-center gap-8">
          <div className="w-[80px] rounded-full bg-[#CCCCCC]">
            <img src={selectedImage} alt="Profile" className="rounded-full" />
          </div>
          <div>
            <h2 className="text-[#555555] dark:text-gray400 text-[16px] leading-[26px] font-regular">
              프로필 이미지를 선택해 주세요!
            </h2>
            <div className="flex gap-1 mt-2 flex-wrap">
              {imageUrls.map((image, index) => (
                <button
                  type="button"
                  key={image}
                  onClick={() => handleImageSelect(image)}
                  className={`rounded-full p-0 border-none ${
                    selectedImage === image
                      ? "border-2 border-purple-500"
                      : "border-transparent"
                  }`}
                >
                  {loading && (
                    <div className="w-12 h-12 max-[767px]:w-10 max-[767px]:h-10 rounded-full border-none skeleton" />
                  )}
                  <img
                    style={{ display: loading ? "none" : "block" }}
                    onLoad={() => {
                      setLoading(false);
                    }}
                    src={image}
                    alt={`Profile ${index + 1}`}
                    className="w-12 h-12 rounded-full object-cover max-[767px]:w-10 max-[767px]:h-10"
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
