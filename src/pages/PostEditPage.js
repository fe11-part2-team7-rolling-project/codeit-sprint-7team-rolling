import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TrashIcon from '../components/TrashIcon';
import DeleteButton from '../components/DeleteButton';
import { getRecipients, deleteRecipient } from '../api/recipientsApi';
import Reactions from '../components/postIdPage/Reactions';
import Share from '../components/postIdPage/Share';

function PostEditPage() {
  // 현재 URL에서 ID를 가져오기 위한 useParams와 페이지 이동을 위한 useNavigate
  const { id } = useParams();
  const navigate = useNavigate();

  // 상태 관리
  const [cards, setCards] = useState([]); // 카드 리스트 상태
  const [deletedCardIds, setDeletedCardIds] = useState([]); // 삭제된 카드 ID를 저장하는 상태
  const [items, setItems] = useState({}); // 롤링페이퍼 정보 상태
  const [page, setPage] = useState(1); // 현재 페이지 번호 (무한 스크롤에 필요)
  const [hasMore, setHasMore] = useState(true); // 추가 데이터 로딩 여부

  // 배경색을 설정하기 위한 색상 맵
  const colorClassMap = {
    purple: 'bg-purple200',
    blue: 'bg-blue200',
    green: 'bg-green200',
    beige: 'bg-beige200',
  };

  // 데이터 로딩: 롤링페이퍼와 관련된 카드 데이터를 가져오는 비동기 함수
  useEffect(() => {
    async function fetchRecipientData() {
      try {
        const data = await getRecipients(id, page); // API를 통해 데이터 가져오기
        const newCards = data.recentMessages.filter(
          (card) => !deletedCardIds.includes(card.id) // 삭제된 카드 제외
        );

        // 새로운 카드가 있으면 상태 업데이트, 없으면 더 이상 로딩하지 않음
        if (newCards.length > 0) {
          setCards((prevCards) => [...prevCards, ...newCards]);
        } else {
          setHasMore(false);
        }

        setItems(data); // 롤링페이퍼 정보 업데이트
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchRecipientData();
  }, [id, page, deletedCardIds]);

  // 무한 스크롤: 사용자가 페이지 하단에 도달할 때 추가 페이지 로딩
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight && hasMore
    ) {
      setPage((prevPage) => prevPage + 1); // 페이지 번호 증가
    }
  };

  // 스크롤 이벤트 리스너 추가 및 제거
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore]);

  // 개별 카드 삭제 함수
  const handleDelete = async (cardId) => {
    try {
      const response = await deleteCard(cardId); // API 호출하여 카드 삭제
      if (response && response.success) {
        setDeletedCardIds((prevIds) => [...prevIds, cardId]); // 삭제된 카드 ID 추가
      } else {
        console.error('카드 삭제 실패: 서버에서 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('카드 삭제 중 오류가 발생했습니다:', error);
      alert('카드 삭제에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  // 전체 롤링페이퍼 삭제 함수
  const handleDeleteAll = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        const response = await deleteRecipient(id); // 롤링페이퍼 삭제 API 호출
        if (response && response.success) { // 삭제 성공 시
          setCards([]); // 모든 카드 상태 비우기
          navigate('/list'); // 삭제 완료 후 리스트 페이지로 이동
        } else {
          console.error('삭제 실패: 서버에서 오류가 발생했습니다.');
        }
      } catch (error) {
        console.error('삭제 중 오류가 발생했습니다:', error);
        alert('삭제에 실패했습니다. 다시 시도해 주세요.');
      }
    }
  };

    // 변경사항 저장 후 이전 페이지로 이동
    const saveAndGoBack = async () => {
    try {
        await updateRecipient(id, { recentMessages: cards });
        navigate(`/post/${id}`);
    } catch (error) {
        console.error('Failed to save changes:', error);
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
            <button
              onClick={saveAndGoBack}
              type="button"
              className="px-2 py-1 sm:px-4 sm:py-2 text-sm sm:text-base bg-purple500 text-white rounded-md shadow-md hover:bg-purple600 transition"
            >
              Save and Go Back
            </button>
          </div>
        </div>

        {/* 공유 및 리액션 영역 */}
        <div className="flex flex-row items-center justify-between bg-white text-black w-full h-[52px] border-b border-gray-200">
          <Reactions />
          <Share />
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
        {/* 카드 목록 및 삭제 버튼 영역 */}
        <div className="p-4 md:p-8 lg:p-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cards.map((card) => (
              <div
                key={card.id}
                className="relative flex flex-col gap-4 items-start justify-center p-4 z-10 w-full h-full min-h-[230px] bg-white rounded-[16px] shadow-lg"
              >
                {/* TrashIcon을 카드 우측 상단에 배치 */}
                <div className="absolute top-8 right-6">
                  <TrashIcon onDelete={() => handleDelete(card.id)} />
                </div>

                {/* 프로필 이미지와 발신자 정보 */}
                <div className="flex flex-row gap-[14px] mx-6 pt-7 pb-4 border-b border-gray200 items-center">
                  <img
                    src={card.profileImageURL || "/default_profile.png"}
                    alt={card.sender}
                    className="w-[56px] h-[56px] rounded-full"
                  />
                  <div className="flex flex-col gap-[6px] text-left">
                    <div className="flex flex-row gap-[6px] items-center">
                      <div className="text-[18px] font-regular leading-[28px] text-black">
                        From.
                      </div>
                      <div className="text-[16px] font-bold leading-[26px] text-black">
                        {card.sender}
                      </div>
                    </div>
                    <div className="flex p-2 ml-auto rounded-[4px] bg-blue100 text-blue500 font-regular text-[14px] leading-[20px]">
                      {card.relationship}
                    </div>
                  </div>
                </div>

                {/* 메시지 내용 */}
                <div className="px-6 py-[16px] font-regular text-left text-[15px] leading-[22px] -tracking-[.01em]">
                  {card.content}
                </div>

                {/* 메시지 날짜 */}
                <div className="px-6 font-regular text-gray500 text-left text-[12px] leading-[18px] -tracking-[.05em]">
                  {new Date(card.createdAt).toLocaleDateString()}
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
