import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getList from "../listApi";

function ListCard({ type }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const nav = useNavigate();
  const colorClassMap = {
    purple: "bg-purple200",
    blue: "bg-blue200",
    green: "bg-green200",
    beige: "bg-beige200",
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // const sort = type === "hot" ? "desc" : "asc"; // 인기순은 내림차순, 최신순은 오름차순
        const data = await getList(8, 0); // sort 파라미터 없이 요청

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
    <div className="pl-5 flex gap-3 overflow-x-auto scrollbar-hide min-[376px]:gap-5 min-[1025px]:overflow-x-hidden min-[1025px]:max-w-[1190px]">
      {list.map((item) => (
        <button
          type="button"
          key={item.id}
          onClick={() => nav(`/post/${item.id}`)}
          className={`flex flex-col border-black/[.10] border-[1px] gap-3 pt-[30px] pl-[24px] rounded-2xl min-w-[208px] h-[232px] min-[376px]:min-w-[275px] min-[376px]:min-h-[260px] shadow-md ${
            colorClassMap[item.backgroundColor]
          }`}
        >
          {/* 받는 사람 */}
          <div className="font-bold text-lg text-gray900 leading-7 min-[376px]:text-2xl min-[376px]:leading-9">
            To. {item.name}
          </div>

          {/* 프로필 이미지 섹션 */}
          <div className="flex -space-x-3">
            {item.recentMessages.slice(0, 3).map((message) => (
              <img
                key={message.id}
                src={message.profileImageURL}
                alt={message.sender}
                className="w-7 h-7 rounded-full border-2 border-white"
              />
            ))}
            {item.recentMessages.length > 3 && (
              <span className="w-8 h-7 rounded-[30px] bg-white text-gray500 text-xs flex justify-center items-center">
                +{item.recentMessages.length - 3}
              </span>
            )}
          </div>
          <div className="text-sm font-regular text-gray700 min-[376px]:text-base">
            {item.messageCount}명이 작성했어요!
          </div>
          {/* 리액션 섹션 */}
          <div className="flex w-[162px] space-x-1 border-black/[.12] border-t-[1px] pt-[17px] mt-[21px] min-[376px]:w-[227px] min-[376px]:space-x-1.5">
            {item.topReactions.map((reaction) => (
              <div
                key={reaction.id}
                className="flex items-center justify-center space-x-1 bg-black/50 w-[53px] h-[32px] rounded-full text-white text-sm min-[376px]:text-base min-[376px]:w-[65px] min-[376px]:h-[36px]"
              >
                <span>{reaction.emoji}</span>
                <span>{reaction.count}</span>
              </div>
            ))}
          </div>
        </button>
      ))}
    </div>
  );
}

export default ListCard;
