import React, { useState, useEffect } from 'react';
import { ReactComponent as Share } from '../assets/share.svg';
import axiosInstance from '../axiosInstance';
import Reactions from '../components/Reactions';

function PostIdPage() {
  const [images, setImages] = useState([]);

  async function fetchData() {
    try {
      const response = await axiosInstance.get('/background-images/');
      console.log(response.data.imageUrls);
      setImages(response.data.imageUrls);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full h-screen">
      <div className="bg-white text-black w-full h-[52px] border-b border-gray200">
        <div className="flex flex-row items-center px-6 w-full h-full text-[18px] leading-[26px] font-regular">
          To. Ashley Kim
        </div>
      </div>
      <div className="flex flex-row items-center justify-between bg-white text-black w-full h-[52px]">
        <Reactions />
        <button
          type="button"
          className="px-[6px] py-2 border rounded-[6px] border-gray300"
        >
          <Share className="w-[20px] h-[20px]" />
        </button>
      </div>
      <div
        className="w-full h-full bg-cover z-0"
        style={{ backgroundImage: `url(${images[3]})` }}
      >
        <div className="z-10">하이</div>
      </div>
    </div>
  );
}

export default PostIdPage;
