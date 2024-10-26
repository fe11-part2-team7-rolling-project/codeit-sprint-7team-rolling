import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';

function PostIdPage() {
  const [images, setImages] = useState([]);

  async function fetchData() {
    try {
      const response = await axiosInstance.get('/background-images/');
      console.log(response.data.imageUrls); // 요청이 성공적으로 완료되면 데이터를 출력
      setImages(response.data.imageUrls);
    } catch (error) {
      console.error('Error fetching data:', error); // 에러 발생 시 처리
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full h-screen">
      <div className="bg-white text-black w-full h-[52px]">
        <div className="flex flex-row items-center px-6 w-full h-full text-[18px] leading-[26px] font-regular">
          To. Ashley Kim
        </div>
      </div>
      <img src={images[3]} alt="배경 이미지" className="w-full h-full" />
    </div>
  );
}

export default PostIdPage;
