import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TrashIcon from '../components/TrashIcon';
import DeleteButton from '../components/DeleteButton';
import {
  getRecipients,
  deleteRecipient,
  deleteMessage,
} from '../api/recipientsApi';
import Reactions from '../components/postIdPage/Reactions';

function PostEditPage() {
  const { id } = useParams(); // 현재 URL에서 ID를 가져옴
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트

  // 상태 관리
  const [items, setItems] = useState({ recentMessages: [] }); // 롤링페이퍼 정보 및 메시지 목록

  // 배경색을 설정하기 위한 색상 맵
  const colorClassMap = {
    purple: 'bg-purple200',
    blue: 'bg-blue200',
    green: 'bg-green200',
    beige: 'bg-beige200',
  };

  // 데이터 로딩: 롤링페이퍼와 관련된 데이터를 가져오는 함수
  useEffect(() => {
    async function fetchRecipientData() {
      try {
        const data = await getRecipients(id);
        setItems(data); // 데이터 업데이트
      } catch (error) {
        console.error('데이터를 불러오는데 실패했습니다:', error);
      }
    }

    fetchRecipientData();
  }, [id]);

  // 개별 메시지 삭제 함수
  const handleDelete = async (messageId) => {
    try {
      await deleteMessage(messageId);

      // 삭제된 메시지를 recentMessages에서 제외하여 상태 업데이트 및 리렌더링 반영
      setItems((prevItems) => ({
        ...prevItems,
        recentMessages: prevItems.recentMessages.filter(
          (message) => message.id !== messageId,
        ),
      }));
    } catch (error) {
      console.error('Failed to delete message:', error);
      alert('메시지 삭제에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  // 전체 롤링페이퍼 삭제 함수
  const handleDeleteAll = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        const response = await deleteRecipient(id); // 롤링페이퍼 삭제 API 호출
        navigate('/list'); // 삭제 완료 후 리스트 페이지로 이동
      } catch (error) {
        console.error('삭제 중 오류가 발생했습니다:', error);
        alert('삭제에 실패했습니다. 다시 시도해 주세요.');
      }
    }
  };

  return (
    <div className="w-full h-full">
      {/* 상단 네비게이션 바 */}
      <div className="sticky top-0 z-20">
        <div className="bg-white text-black w-full h-[52px] border-b border-gray-200 flex justify-between items-center px-6">
          <div className="text-[18px] leading-[26px] font-regular">
            To. {items.name} {/* 롤링페이퍼의 이름 표시 */}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => navigate(`/post/${id}`)}
              type="button"
              className="px-2 py-1 sm:px-4 sm:py-2 text-sm sm:text-base bg-blue500 text-white rounded-md shadow-md hover:bg-blue600 transition"
            >
              Back
            </button>
          </div>
        </div>

        {/* 공유 및 리액션 영역 */}
        <div className="flex flex-row items-center justify-between bg-white text-black w-full h-[52px] border-b border-gray-200">
          <Reactions />
        </div>
      </div>

      {/* 배경 설정 */}
      <div
        className={`w-full min-h-screen h-full bg-cover z-0 ${
          items.backgroundImageURL ? '' : colorClassMap[items.backgroundColor]
        }`}
        style={{
          backgroundImage: items.backgroundImageURL
            ? `url(${items.backgroundImageURL})`
            : 'none',
          backgroundSize: items.backgroundImageURL ? 'cover' : 'auto',
          backgroundPosition: 'center',
        }}
      >
        {/* 메시지 목록 및 삭제 버튼 영역 */}
        <div className="p-4 md:p-8 lg:p-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.recentMessages.map((message) => (
              <div
                key={message.id}
                className="relative flex flex-col gap-4 items-start justify-center p-4 z-10 w-full h-full min-h-[230px] bg-white rounded-[16px] shadow-lg"
              >
                {/* TrashIcon을 메시지 카드의 우측 상단에 배치 */}
                <div className="absolute top-8 right-6">
                  <TrashIcon onDelete={() => handleDelete(message.id)} />
                </div>

                {/* 프로필 이미지와 발신자 정보 */}
                <div className="flex flex-row gap-[14px] mx-6 pt-7 pb-4 border-b border-gray200 items-center">
                  <img
                    src={message.profileImageURL || '/default_profile.png'}
                    alt={message.sender}
                    className="w-[56px] h-[56px] rounded-full"
                  />
                  <div className="flex flex-col gap-[6px] text-left">
                    <div className="flex flex-row gap-[6px] items-center">
                      <div className="text-[18px] font-regular leading-[28px] text-black">
                        From.
                      </div>
                      <div className="text-[16px] font-bold leading-[26px] text-black">
                        {message.sender}
                      </div>
                    </div>
                    <div className="flex p-2 ml-auto rounded-[4px] bg-blue100 text-blue500 font-regular text-[14px] leading-[20px]">
                      {message.relationship}
                    </div>
                  </div>
                </div>

                {/* 메시지 내용 */}
                <div className="px-6 py-[16px] font-regular text-left text-[15px] leading-[22px] -tracking-[.01em]">
                  {message.content}
                </div>

                {/* 메시지 날짜 */}
                <div className="px-6 font-regular text-gray500 text-left text-[12px] leading-[18px] -tracking-[.05em]">
                  {new Date(message.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 하단 고정 전체 삭제 버튼 */}
        <div className="fixed bottom-4 left-0 right-0 flex justify-center z-20">
          <DeleteButton
            onClick={handleDeleteAll}
            label="삭제하기"
            className="bg-purple500 text-white py-2 px-6 rounded-md shadow-md hover:bg-purple600"
          />
        </div>
      </div>
    </div>
  );
}

export default PostEditPage;
