import React, { useState, useEffect } from 'react';
import { ReactComponent as Share } from '../assets/share.svg';
import axiosInstance from '../axiosInstance';
import Reactions from '../components/Reactions';

function PostIdPage() {
  const [images, setImages] = useState([]);
  const [profile, setProfile] = useState([]);

  async function fetchBackgroundImageData() {
    try {
      const response = await axiosInstance.get('/background-images/');
      console.log(response.data.imageUrls);
      setImages(response.data.imageUrls);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async function fetchProfileImageData() {
    try {
      const response = await axiosInstance.get('/profile-images/');
      console.log(response.data.imageUrls);
      setProfile(response.data.imageUrls);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchBackgroundImageData();
    fetchProfileImageData();
  }, []);

  return (
    <div className="w-full h-full">
      <div className="sticky top-0 z-20">
        <div className="bg-white text-black w-full h-[52px] border-b border-gray200">
          <div className="flex flex-row items-center px-6 w-full h-full text-[18px] leading-[26px] font-regular">
            To. Ashley Kim
          </div>
        </div>
        <div className="flex flex-row items-center justify-between bg-white text-black w-full h-[52px] border-b border-gray200">
          <Reactions />
          <button
            type="button"
            className="px-[6px] py-2 border rounded-[6px] border-gray300"
          >
            <Share className="w-[20px] h-[20px]" />
          </button>
        </div>
      </div>
      <div
        className="w-full h-full bg-cover z-0"
        style={{
          backgroundImage: `url(${images[3]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="flex flex-col gap-4 items-center justify-center p-4 z-10">
          <div className="w-full h-full min-h-[230px] bg-white flex items-center justify-center rounded-[16px] shadow-lg">
            <button
              type="button"
              className="w-[56px] h-[56px] p-4 bg-gray500  rounded-full text-[24px] text-white flex flex-row justify-center items-center"
            >
              +
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4 items-center justify-center p-4 z-10">
          <div className="w-full h-full min-h-[230px] bg-white flex items-center justify-center rounded-[16px] shadow-lg">
            <button
              type="button"
              className="w-[56px] h-[56px] p-4 bg-gray500  rounded-full text-[24px] text-white flex flex-row justify-center items-center"
            >
              +
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4 items-center justify-center p-4 z-10">
          <div className="w-full h-full min-h-[230px] bg-white flex items-center justify-center rounded-[16px] shadow-lg">
            <div className="flex flex-row gap-[16px]">
              <img
                src={`${profile[1]}`}
                alt="프로필 이미지"
                className="w-[56px] h-[56px] rounded-full"
              />
              <div className="flex flex-col gap-[6px]">
                <div className="flex flex-row gap-[6px] items-center">
                  <div className="text-[18px] font-regular leading-[28px] text-black">
                    From.
                  </div>
                  <div className="text-[16px] font-bold leading-[26px] text-black">
                    김동훈
                  </div>
                </div>
                <div>친구</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostIdPage;
