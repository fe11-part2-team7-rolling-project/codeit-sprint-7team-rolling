import React, { useState, useEffect } from 'react';
import messageData from '../data/messageData.json';

function Message() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages(messageData.results);
  }, []);

  return (
    <div>
      {messages.map((message) => (
        <div
          key={message.id}
          className="flex flex-col gap-4 items-center justify-center p-4 z-10"
        >
          <div className="w-full h-full min-h-[230px] bg-white flex flex-col items-center justify-center rounded-[16px] shadow-lg">
            <div className="flex flex-row gap-[16px]">
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
                <div>{message.relationship}</div>
              </div>
            </div>
            <div>{message.content}</div>
            <div>{message.createdAt}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Message;
