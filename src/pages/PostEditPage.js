// src/pages/PostEditPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TrashIcon from '../components/TrashIcon';
import DeleteButton from '../components/DeleteButton';
import { getRecipients } from '../api/recipientsApi';
import Reactions from '../components/postIdPage/Reactions';
import Share from '../components/postIdPage/Share';

function PostEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [recipient, setRecipient] = useState({ name: '' });


  useEffect(() => {
    async function fetchRecipientData() {
      try {
        const data = await getRecipients(id);
        setCards(data.recentMessages); // 카드 데이터를 설정
        setRecipient(data); // 전체 롤링페이퍼 데이터에서 이름 등 필요한 정보 설정
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchRecipientData();
  }, [id]);

  // 개별 카드 삭제 기능
  const handleDelete = (cardId) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
  };

  // 전체 삭제 기능
  const handleDeleteAll = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await deleteRecipient(id); // 롤링페이퍼 삭제 API 호출
        navigate('/list'); // 삭제 완료 후 /list 페이지로 이동
      } catch (error) {
        console.error('삭제 중 오류가 발생했습니다:', error);
      }
    }
  };

  // Save and Go Back 기능
  const saveAndGoBack = async () => {
    try {
      navigate(`/post/${id}`);
    } catch (error) {
      console.error('Failed to save changes:', error);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="sticky top-0 z-20">
        <div className="bg-white text-black w-full h-[52px] border-b border-gray-200 flex justify-between items-center px-6">
          <div className="text-[18px] leading-[26px] font-regular">
           To. {recipient.name}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => navigate(`/post/${id}`)}
              type="button"
              className="px-2 py-1 sm:px-4 sm:py-2 text-sm sm:text-base bg-blue500 text-white rounded-md shadow-md hover:bg-blue700 transition"
            >
              Back
            </button>
            <button
              onClick={saveAndGoBack}
              type="button"
              className="px-2 py-1 sm:px-4 sm:py-2 text-sm sm:text-base bg-purple500 text-white rounded-md shadow-md hover:bg-purple600 transition"
            >
              Save and Go Back
            </button>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between bg-white text-black w-full h-[52px] border-b border-gray-200">
          <Reactions />
          <Share />
        </div>
      </div>

      <div className="p-4 md:p-8 lg:p-12">
        {/* 반응형 그리드 레이아웃 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card) => (
            <div
              key={card.id}
              className="relative p-4 border border-gray200 rounded-md shadow bg-white"
            >
              <div className="flex items-center space-x-2 mb-2">
                <img
                  src={card.profileImageURL || "/default_profile.png"} // 프로필 이미지 추가
                  alt={card.sender}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">{card.sender}</p>
                  <p className="text-xs text-gray-500">{card.relationship}</p>
                </div>
              </div>
              <p className="text-sm mb-4">{card.content}</p>
              <p className="text-xs text-gray-500">{new Date(card.createdAt).toLocaleDateString()}</p>
              <TrashIcon onDelete={() => handleDelete(card.id)} />
            </div>
          ))}
        </div>

        {/* 하단에 전체 삭제 버튼 추가 */}
        <div className="flex justify-center mt-8">
          <DeleteButton onClick={handleDeleteAll} label="삭제하기" className="bg-purple500 text-white py-2 px-6 rounded-md shadow-md hover:bg-purple600" />
        </div>
      </div>
    </div>
  );
}

export default PostEditPage;
