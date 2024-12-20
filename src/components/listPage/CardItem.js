import React from 'react';
import PropTypes from 'prop-types';
import purpleShape from '../../assets/pattern_01.png';
import beigeShape from '../../assets/pattern_02.png';
import greenShape from '../../assets/pattern_04.png';
import blueShape from '../../assets/pattern_03.png';
import CardProfileImg from './CardProfileImg';

function CardItem({ item, nav, colorClassMap }) {
  const shapeImageMap = {
    purple: purpleShape,
    beige: beigeShape,
    green: greenShape,
    blue: blueShape,
  };

  return (
    <button
      type="button"
      onClick={() => nav(`/post/${item.id}`)}
      className={`relative flex overflow-hidden flex-col items-start justify-start border-black/[.10] border-[1px] gap-3 pt-[30px] pl-[24px] rounded-2xl min-w-[208px] h-[232px] mobile:min-w-[275px] mobile:min-h-[260px] shadow-md ${
        item.backgroundImageURL
          ? 'text-white'
          : colorClassMap[item.backgroundColor]
      }`}
      style={{
        backgroundImage: item.backgroundImageURL
          ? `url(${item.backgroundImageURL})`
          : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {item.backgroundImageURL && (
        <div className="absolute inset-0 bg-black opacity-50 rounded-2xl" />
      )}
      <div className="relative z-10 text-start flex flex-col gap-3">
        {/* 받는 사람 */}
        <h2
          className={`font-bold text-lg leading-7 mobile:text-2xl ${
            item.backgroundImageURL ? 'text-white' : 'text-gray900'
          }`}
        >
          To. {item.name}
        </h2>

        {/* 프로필 이미지 섹션 */}
        <div className="flex -space-x-3">
          {item.recentMessages.slice(0, 3).map((message) => (
            <CardProfileImg key={message.id} message={message} />
          ))}
          {item.messageCount > 3 && (
            <span className="w-8 h-7 rounded-[30px] bg-white font-regular text-gray500 text-xs flex justify-center items-center">
              +{item.messageCount - 3}
            </span>
          )}
        </div>
        <div className="text-sm font-extraLight mobile:text-base ">
          <span className="font-bold">{item.messageCount}</span>명이 작성했어요!
        </div>

        {/* 리액션 섹션 */}
        <div className="absolute top-28 flex w-[162px] gap-1 space-x-1 border-black/[.12] mt-[18px] border-t-[1px] pt-[17px] mobile:mt-[30px] mobile:w-[227px] mobile:space-x-1.5">
          {item.topReactions.map((reaction) => (
            <div
              key={reaction.id}
              className="flex items-center justify-center space-x-1 bg-black/50 w-[53px] h-[32px] rounded-full text-white text-sm mobile:text-base mobile:w-[65px] mobile:h-[36px]"
            >
              <span>{reaction.emoji}</span>
              <span className="text-sm font-extraLight mobile:text-base">
                {reaction.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 색상에 따른 도형 이미지 추가 (backgroundImageURL이 없을 때만 표시) */}
      {!item.backgroundImageURL && shapeImageMap[item.backgroundColor] && (
        <img
          src={shapeImageMap[item.backgroundColor]}
          alt={`${item.backgroundColor} shape`}
          className="absolute w-36 h-28 left-[100px] top-[120px] mobile:w-36 mobile:h-36 mobile:left-[130px] mobile:top-[120px]"
        />
      )}
    </button>
  );
}

CardItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string,
    backgroundImageURL: PropTypes.string,
    recentMessages: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        sender: PropTypes.string.isRequired,
        profileImageURL: PropTypes.string,
      }),
    ),
    messageCount: PropTypes.number,
    topReactions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        emoji: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
      }),
    ),
  }).isRequired,
  nav: PropTypes.func.isRequired,
  colorClassMap: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default CardItem;
