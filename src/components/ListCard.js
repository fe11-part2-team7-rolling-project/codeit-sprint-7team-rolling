import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getList from "../listApi";

function ListCard({ type }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const nav = useNavigate();

  const colorClassMap = {
    purple: "bg-purple200",
    blue: "bg-blue200",
    green: "bg-green200",
    beige: "bg-beige200",
  };

  const CARDS_PER_PAGE = 4;
  const totalPages = Math.ceil(list.length / CARDS_PER_PAGE);
  const startIndex = currentPage * CARDS_PER_PAGE;
  const currentCards = list.slice(startIndex, startIndex + CARDS_PER_PAGE);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getList(1000, 0);
        setList(data);
      } catch (err) {
        setError("데이터를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [type]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="relative flex items-center">
      {/* PC 환경에서만 페이지네이션 */}
      <div className="hidden min-[1025px]:flex min-[1025px]:gap-5 min-[1025px]:overflow-hidden min-[1025px]:max-w-[1190px]">
        {/* 좌측 화살표 버튼 */}
        {currentPage > 0 && (
          <button
            type="button"
            onClick={() => setCurrentPage(currentPage - 1)}
            className="absolute left-0 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-100"
          >
            <span className="text-lg font-bold">&lt;</span>
          </button>
        )}

        {/* 현재 페이지에 해당하는 카드들만 표시 */}
        {currentCards.map((item) => (
          <button
            type="button"
            key={item.id}
            onClick={() => nav(`/post/${item.id}`)}
            className={`relative flex flex-col items-start justify-start border-black/[.10] border-[1px] gap-5 pt-[30px] pl-[24px] rounded-2xl min-w-[208px] h-[232px] min-[376px]:min-w-[275px] min-[376px]:min-h-[260px] shadow-md ${
              item.backgroundImageURL
                ? "text-white"
                : colorClassMap[item.backgroundColor]
            }`}
            style={{
              backgroundImage: item.backgroundImageURL
                ? `url(${item.backgroundImageURL})`
                : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {item.backgroundImageURL && (
              <div className="absolute inset-0 bg-black opacity-50 rounded-2xl" />
            )}
            <div className="relative z-10 text-start">
              <div className="font-bold text-2xl leading-7">
                To. {item.name}
              </div>
              <div className="flex -space-x-3 mt-2">
                {item.recentMessages.slice(0, 3).map((message) => (
                  <img
                    key={message.id}
                    src={message.profileImageURL}
                    alt={message.sender}
                    className="w-7 h-7 rounded-full border-2 border-white"
                  />
                ))}
                {item.recentMessages.length > 3 && (
                  <span className="w-8 h-7 rounded-[30px] bg-white text-gray-500 text-xs flex justify-center items-center">
                    +{item.recentMessages.length - 3}
                  </span>
                )}
              </div>
              <div className="text-base font-regular mt-2">
                <span className="font-bold">{item.messageCount}</span>명이
                작성했어요!
              </div>
            </div>
          </button>
        ))}

        {/* 우측 화살표 버튼 */}
        {currentPage < totalPages - 1 && (
          <button
            type="button"
            onClick={() => setCurrentPage(currentPage + 1)}
            className="absolute right-0 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-100"
          >
            <span className="text-lg font-bold">&gt;</span>
          </button>
        )}
      </div>

      {/* 모바일 및 태블릿 환경에서 가로 스크롤 */}
      <div className="flex gap-3 overflow-x-auto scrollbar-hide min-[1025px]:hidden min-[376px]:gap-5">
        {list.map((item) => (
          <button
            type="button"
            key={item.id}
            onClick={() => nav(`/post/${item.id}`)}
            className={`relative flex flex-col items-start justify-start border-black/[.10] border-[1px] gap-3 pt-[30px] pl-[24px] rounded-2xl min-w-[208px] h-[232px] min-[376px]:min-w-[275px] min-[376px]:min-h-[260px] shadow-md ${
              item.backgroundImageURL
                ? "text-white"
                : colorClassMap[item.backgroundColor]
            }`}
            style={{
              backgroundImage: item.backgroundImageURL
                ? `url(${item.backgroundImageURL})`
                : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {item.backgroundImageURL && (
              <div className="absolute inset-0 bg-black opacity-50 rounded-2xl" />
            )}
            <div className="relative z-10 text-start">
              <div className="font-bold text-lg leading-7 min-[376px]:text-2xl">
                To. {item.name}
              </div>
              <div className="flex -space-x-3 mt-2">
                {item.recentMessages.slice(0, 3).map((message) => (
                  <img
                    key={message.id}
                    src={message.profileImageURL}
                    alt={message.sender}
                    className="w-7 h-7 rounded-full border-2 border-white"
                  />
                ))}
                {item.recentMessages.length > 3 && (
                  <span className="w-8 h-7 rounded-[30px] bg-white text-gray-500 text-xs flex justify-center items-center">
                    +{item.recentMessages.length - 3}
                  </span>
                )}
              </div>
              <div className="text-sm font-regular mt-2 min-[376px]:text-base">
                <span className="font-bold">{item.messageCount}</span>명이
                작성했어요!
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ListCard;
