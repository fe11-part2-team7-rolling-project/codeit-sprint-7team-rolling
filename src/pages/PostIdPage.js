import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Reactions from '../components/Reactions';
import Message from '../components/Message';
import Share from '../components/Share';
import getRecipents from '../api/recipients';

function PostIdPage() {
  const { id } = useParams();
  const [images, setImages] = useState('');
  const colorClassMap = {
    purple: 'bg-purple200',
    blue: 'bg-blue200',
    green: 'bg-green200',
    beige: 'bg-beige200',
  };

  useEffect(() => {
    async function fetchBackgroundImageData() {
      try {
        const data = await getRecipents(id);
        setImages(data.backgroundColor);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchBackgroundImageData();
  }, [id]);

  return (
    <div className="w-full h-full">
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        draggable
        className="p-4"
      />
      <div className="sticky top-0 z-20">
        <div className="bg-white text-black w-full h-[52px] border-b border-gray200">
          <div className="flex flex-row items-center px-6 w-full h-full text-[18px] leading-[26px] font-regular">
            To. Ashley Kim
          </div>
        </div>
        <div className="flex flex-row items-center justify-between bg-white text-black w-full h-[52px] border-b border-gray200">
          <Reactions />
          <Share />
        </div>
      </div>
      <div className={`w-full h-full bg-cover z-0 ${colorClassMap[images]}`}>
        <div className="flex flex-col gap-4 items-center justify-center p-4 z-10">
          <div className="w-full h-full min-h-[230px] bg-white flex items-center justify-center rounded-[16px] shadow-lg">
            <Link
              to="/post/1/message"
              className="w-[56px] h-[56px] bg-gray500 rounded-full text-[24px] text-white flex justify-center items-center"
            >
              +
            </Link>
          </div>
        </div>
        <Message />
      </div>
    </div>
  );
}

export default PostIdPage;
