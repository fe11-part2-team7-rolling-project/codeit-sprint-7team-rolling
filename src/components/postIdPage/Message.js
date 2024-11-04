import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { getRecipientsMessage } from '../../api/recipientsApi';

function Message() {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const loadMoreRef = useRef(null);
  const fontClasses = {
    'Noto Sans': 'font-noto',
    Pretendard: 'font-regular',
    나눔명조: 'font-custom',
    '나눔손글씨 손편지체': 'font-custom',
  };
  const relationMap = {
    지인: 'bg-beige100 text-beige500',
    동료: 'bg-purple100 text-purple500',
    가족: 'bg-green100 text-green500',
    친구: 'bg-blue100 text-blue500',
  };

  const limit = 8;

  useEffect(() => {
    const fetchRecipientMessageData = async () => {
      setLoading(true);
      try {
        const data = await getRecipientsMessage(id, limit, offset);
        setMessages((prevMessages) => [...prevMessages, ...data.results]);
        setHasMore(data.next !== null);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipientMessageData();
  }, [id, offset]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasMore && !loading) {
          setOffset((prevOffset) => prevOffset + limit);
        }
      });
    };

    const observerInstance = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );
    const currentRef = loadMoreRef.current;

    if (currentRef) {
      observerInstance.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observerInstance.unobserve(currentRef);
      }
    };
  }, [hasMore, loading]);

  const openModal = (message) => {
    setSelectedMessage(message);
    console.log(message.font);
  };

  const closeModal = () => {
    setSelectedMessage(null);
  };

  return (
    <div className="max-w-[1200px] md:pt-20 xl:pt-28 mx-auto grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <div className="flex flex-col gap-4 items-center justify-center p-4 z-10">
        <div className="w-full h-full min-h-[230px] bg-white dark:bg-dark2 flex items-center justify-center rounded-[16px] shadow-lg">
          <Link
            to={`/post/${id}/message`}
            className="w-14 h-14 bg-gray500 rounded-full text-[24px] text-white flex justify-center items-center"
          >
            +
          </Link>
        </div>
      </div>
      {messages.map((message) => (
        <button
          type="button"
          key={message.id}
          className="flex flex-col gap-4 items-center justify-center p-4 z-10 cursor-pointer"
          onClick={() => openModal(message)}
        >
          <div className="w-full min-h-[285px] bg-white dark:bg-dark2 flex flex-col justify-between rounded-[16px] shadow-lg">
            <head className="flex flex-row gap-[14px] mx-6 pt-7 pb-4 border-b border-gray200">
              <img
                src={`${message.profileImageURL}`}
                alt="프로필 이미지"
                className="w-14 h-14 rounded-full"
              />
              <div className="flex flex-col gap-[6px]">
                <div className="flex flex-row gap-[6px] items-center">
                  <div className="text-[18px] font-regular leading-[28px] text-black dark:text-gray200">
                    From.
                  </div>
                  <div className="text-[16px] font-bold leading-[26px] text-black dark:text-gray200">
                    {message.sender}
                  </div>
                </div>
                <div
                  className={`flex px-2 py-1 mr-auto rounded-[4px] ${
                    relationMap[message.relationship]
                  } font-regular text-[14px] leading-[20px]`}
                >
                  {message.relationship}
                </div>
              </div>
            </head>
            <p
              className={`px-6 py-[16px] h-[80px] ${
                fontClasses[message.font] || 'font-custom'
              } text-gray600 dark:text-gray300 text-left text-[15px] leading-[22px] -tracking-[.01em] overflow-hidden text-ellipsis`}
            >
              {message.content}
            </p>
            <div className="py-6 px-6 font-extraLight text-gray400 dark:text-gray300 text-[12px] leading-[18px] -tracking-[.05em]">
              {dayjs(message.createdAt).format('YYYY.MM.DD')}
            </div>
          </div>
        </button>
      ))}

      {hasMore && !loading && <div ref={loadMoreRef} className="h-10" />}

      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-md">
            <div className="flex justify-between mb-4">
              <div className="flex gap-[14px] ">
                <img
                  src={selectedMessage.profileImageURL}
                  alt="프로필 이미지"
                  className="w-[56px] h-[56px] rounded-full"
                />
                <div className="flex flex-col gap-[6px]">
                  <div className="flex flex-row gap-[6px] items-center">
                    <div className="text-[18px] font-regular leading-[28px] text-black">
                      From.
                    </div>
                    <div className="text-[16px] font-bold leading-[26px] text-black">
                      {selectedMessage.sender}
                    </div>
                  </div>
                  <div
                    className={`flex p-2 mr-auto rounded-[4px] ${
                      relationMap[selectedMessage.relationship]
                    } font-regular text-[14px] leading-[20px]`}
                  >
                    {selectedMessage.relationship}
                  </div>
                </div>
              </div>
              <div className="font-regular text-gray500 text-[12px] leading-[18px]">
                {dayjs(selectedMessage.createdAt).format('YYYY.MM.DD')}
              </div>
            </div>
            <p
              className={`max-h-60 overflow-y-auto ${
                fontClasses[selectedMessage.font] || 'font-custom'
              } text-left text-[15px] leading-[22px] mb-4`}
            >
              {selectedMessage.content}
            </p>

            <button
              type="button"
              className="flex justify-center items-center mx-auto w-[120px] px-4 py-[7px] rounded-[6px] font-regular text-[16px] text-white bg-purple600"
              onClick={closeModal}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Message;
