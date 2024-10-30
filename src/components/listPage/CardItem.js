import React from "react";

function CardItem({ item, nav, colorClassMap }) {
  return (
    <button
      type="button"
      onClick={() => nav(`/post/${item.id}`)}
      className={` relative flex flex-col items-start justify-start border-black/[.10] border-[1px] gap-3 pt-[30px] pl-[24px] rounded-2xl min-w-[208px] h-[232px] min-[376px]:min-w-[275px] min-[376px]:min-h-[260px] shadow-md ${
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
      <div className="relative z-10 text-start flex flex-col gap-3">
        {/* 받는 사람 */}
        <div
          className={`font-bold text-lg leading-7 min-[376px]:text-2xl ${
            item.backgroundImageURL ? "text-white" : "text-gray900"
          }`}
        >
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
          {item.messageCount > 3 && (
            <span className="w-8 h-7 rounded-[30px] bg-white font-regular text-gray500 text-xs flex justify-center items-center">
              +{item.messageCount - 3}
            </span>
          )}
        </div>
        <div className="text-sm font-regular min-[376px]:text-base">
          <span className="font-bold">{item.messageCount}</span>명이 작성했어요!
        </div>

        {/* 리액션 섹션 */}
        <div className="flex w-[162px] gap-1 space-x-1 border-black/[.12] mt-[18px] border-t-[1px] pt-[17px] min-[376px]:mt-[30px] min-[376px]:w-[227px] min-[376px]:space-x-1.5">
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
      </div>
    </button>
  );
}

export default CardItem;