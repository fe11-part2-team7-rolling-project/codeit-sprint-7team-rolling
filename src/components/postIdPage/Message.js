import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { getRecipientsMessage } from '../../api/recipientsApi';

function Message() {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchRecipientMessageData() {
      try {
        const data = await getRecipientsMessage(id);
        setMessages(data.results);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchRecipientMessageData();
  }, [id]);

  return (
    <div className="max-w-[1200px] mx-auto grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <div className="flex flex-col gap-4 items-center justify-center p-4 z-10">
        <div className="w-full h-full min-h-[230px] bg-white flex items-center justify-center rounded-[16px] shadow-lg">
          <Link
            to={`/post/${id}/message`}
            className="w-[56px] h-[56px] bg-gray500 rounded-full text-[24px] text-white flex justify-center items-center"
          >
            +
          </Link>
        </div>
      </div>
      {messages.map((message) => (
        <div
          key={message.id}
          className="flex flex-col gap-4 items-center justify-center p-4 z-10"
        >
          <div className="w-full h-full min-h-[230px] bg-white flex flex-col  rounded-[16px] shadow-lg">
            <div className="flex flex-row gap-[14px] mx-6 pt-7 pb-4 border-b border-gray200">
              <img
                src={`${message.profileImageURL}`}
                alt="프로필 이미지"
                className="w-[56px] h-[56px] rounded-full"
              />
              <div className="flex flex-col gap-[6px]">
                <div className="flex flex-row gap-[6px] items-center">
                  <div className="text-[18px] font-regular leading-[28px] text-black">
                    From.
                  </div>
                  <div className="text-[16px] font-bold leading-[26px] text-black">
                    {message.sender}
                  </div>
                </div>
                <div className="flex p-2 mr-auto rounded-[4px] bg-blue100 text-blue500 font-regular text-[14px] leading-[20px]">
                  {message.relationship}
                </div>
              </div>
            </div>
            <div className="px-6 py-[16px] font-regular text-left text-[15px] leading-[22px] -tracking-[.01em]">
              {message.content}
            </div>
            <div className="px-6 font-regular text-gray500 text-[12px] leading-[18px] -tracking-[.05em]">
              {dayjs(message.createdAt).format('YYYY.MM.DD')}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Message;
