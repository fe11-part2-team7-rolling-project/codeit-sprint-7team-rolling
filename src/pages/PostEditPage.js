// pages/PostEditPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TrashIcon from '../components/TrashIcon';
import DeleteButton from '../components/DeleteButton'; // DeleteButton 임포트
import { getRecipients } from '../api/recipientsApi';

function PostEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchRecipientData() {
      try {
        const data = await getRecipients(id);
        setCards(data.recentMessages); // 각 카드 데이터를 가져옴
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchRecipientData();
  }, [id]);

  // 카드 삭제 기능
  const handleDelete = (cardId) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
  };

  // Save and Back 기능
  const saveAndGoBack = async () => {
    try {
      navigate(`/post/${id}`);
    } catch (error) {
      console.error('Failed to save changes:', error);
    }
  };

  // 전체 삭제 및 /list로 이동하는 기능
  const handleDeleteAllAndGoToList = () => {
    const confirmDelete = window.confirm('정말로 모든 카드를 삭제하시겠습니까?');
    if (confirmDelete) {
      setCards([]); // 모든 카드를 삭제
      navigate('/list'); // /list 페이지로 이동
    }
  };

  return (
    <div className="p-4 md:p-8 lg:p-12">
      {/* 상단 우측에 Back과 Save and Go Back 버튼 추가 */}
      <div className="flex justify-end space-x-2 mb-4">
        <button
          onClick={() => navigate(`/post/${id}`)}
          type="button"
          className="px-4 py-2 bg-blue500 text-white rounded-md shadow-md hover:bg-blue600"
        >
          Back
        </button>
        <button
          onClick={saveAndGoBack}
          type="button"
          className="px-4 py-2 bg-purple500 text-white rounded-md shadow-md hover:bg-purple600"
        >
          Save and Go Back
        </button>
      </div>

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
                <p className="text-xs text-gray500">{card.relationship}</p>
              </div>
            </div>
            <p className="text-sm mb-4">{card.content}</p>
            <p className="text-xs text-gray500">{new Date(card.createdAt).toLocaleDateString()}</p>
            <TrashIcon onDelete={() => handleDelete(card.id)} />
          </div>
        ))}
      </div>

      {/* 하단의 DeleteButton 추가 */}
      <div className="flex justify-center mt-8">
        <DeleteButton
          label="삭제하기"
          onClick={handleDeleteAllAndGoToList}
          className="w-full max-w-xs px-4 py-2 bg-purple500 text-white rounded-md shadow-md hover:bg-purple600"
        />
      </div>
    </div>
  );
}

export default PostEditPage;
