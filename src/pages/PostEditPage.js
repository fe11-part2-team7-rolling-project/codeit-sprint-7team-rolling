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
  const [items, setItems] = useState({}); 

  const colorClassMap = {
    purple: 'bg-purple200',
    blue: 'bg-blue200',
    green: 'bg-green200',
    beige: 'bg-beige200',
  };

  useEffect(() => {
    async function fetchRecipientData() {
      try {
        const data = await getRecipients(id);
        setCards(data.recentMessages); // 각 카드 데이터를 가져옴
        setItems(data); // 롤링페이퍼의 이름과 배경색 데이터를 가져옴
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchRecipientData();
  }, [id]);

  const handleDelete = (cardId) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
  };

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
            To. {items.name}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => navigate(`/post/${id}`)}
              type="button"
              className="px-2 py-1 sm:px-4 sm:py-2 text-sm sm:text-base bg-blue500 text-white rounded-md shadow-md hover:bg-blue600 transition"
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
        <div className="p-4 md:p-8 lg:p-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cards.map((card) => (
              <div
                key={card.id}
                className="relative flex flex-col gap-4 items-start p-4 z-10 w-full h-full min-h-[230px] bg-white rounded-[16px] shadow-lg"
              >
                <div className="absolute top-8 right-6">
                  <TrashIcon onDelete={() => handleDelete(card.id)} />
                </div>
                <div className="flex flex-row gap-[14px] mx-6 pt-7 pb-4 border-b border-gray200 w-full">
                  <img
                    src={card.profileImageURL || "/default_profile.png"}
                    alt={card.sender}
                    className="w-[56px] h-[56px] rounded-full"
                  />
                  <div className="flex flex-col gap-[6px]">
                    <div className="flex flex-row gap-[6px] items-center">
                      <div className="text-[18px] font-regular leading-[28px] text-black">
                        From.
                      </div>
                      <div className="text-[16px] font-bold leading-[26px] text-black">
                        {card.sender}
                      </div>
                    </div>
                    <div className="flex p-2 rounded-[4px] bg-blue100 text-blue500 font-regular text-[14px] leading-[20px]">
                      {card.relationship}
                    </div>
                  </div>
                </div>

                {/* 메시지 내용 */}
                <div className="px-6 py-[16px] font-regular text-left text-[15px] leading-[22px] -tracking-[.01em] w-full">
                  {card.content}
                </div>
                
                {/* 메시지 날짜 */}
                <div className="px-6 font-regular text-gray500 text-[12px] leading-[18px] -tracking-[.05em] w-full">
                  {new Date(card.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <DeleteButton
              onClick={handleDeleteAll}
              label="삭제하기"
              className="bg-purple500 text-white py-2 px-6 rounded-md shadow-md hover:bg-purple600"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostEditPage;
