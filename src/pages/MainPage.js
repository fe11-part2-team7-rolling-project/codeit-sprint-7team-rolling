import React from 'react';
import Header from '../components/Layout/Header';
import Section from '../components/Section';
import ExploreButton from '../components/Layout/ExploreButton';
import mainCard from '../assets/main_card.svg';
import mainEmoji from '../assets/main_emoji.png';

function MainPage() {
  return (
    <div className="flex flex-col items-center p-4 bg-white min-h-screen">
      <Header />
      <Section
        point="Point.01"
        title={"누구나 손쉽게,\n온라인 롤링 페이퍼를 만들 수 있어요"}
        description={"로그인 없이\n자유롭게 만들어요."}
        imageName={mainCard}
        align="left"
      />
      <Section
        point="Point.02"
        title={"서로에게 이모지로 감정을\n표현해보세요"}
        description={"롤링 페이퍼에 이모지를\n추가할 수 있어요."}
        imageName={mainEmoji}
        align="right"
      />
      <div className="mt-8">
        <ExploreButton />
      </div>
    </div>
  );
}

export default MainPage;