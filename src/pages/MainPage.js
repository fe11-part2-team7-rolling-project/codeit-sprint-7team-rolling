import React from 'react';
import Header from '../components/Layout/Header';
import Section from '../components/Section';
import ExploreButton from '../components/Layout/ExploreButton';
import php1 from '../assets/php1.svg';
import php2 from '../assets/php2.svg';

function MainPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="flex flex-col items-center py-8 px-4 sm:px-6 md:px-16 lg:px-24">
        <Section
          point="Point.01"
          title="누구나 손쉽게, 온라인 롤링 페이퍼를 만들 수 있어요"
          description="로그인 없이 자유롭게 만들어요."
          cards={[
            {
              id: 1,
              from: '장미나',
              text: '코로나가 한창이던 그때를...',
              date: '2023.07.08',
              profileImage: php1,
            },
            {
              id: 2,
              from: '박대영',
              text: '일교차가 큰 시기입니다...',
              date: '2023.07.08',
              profileImage: php2,
            },
            { id: 3, from: '', text: '', date: '', profileImage: null }, // 플러스 아이콘 카드
          ]}
          emojiSection={false} // 이 섹션에는 이모지 섹션 포함하지 않음
        />

        {/* 두 번째 섹션 - 이모지 섹션 포함 */}
        <Section
          point="Point.02"
          title="서로에게 이모지로 감정을 표현해보세요"
          description="롤링 페이퍼에 이모지를 추가할 수 있어요."
          cards={[]} // 이 섹션에 카드가 필요 없으면 빈 배열 전달
          emojiSection // emojiSection={true}를 emojiSection으로 변경
        />

        {/* 구경해보기 버튼 */}
        <ExploreButton />
      </main>
    </div>
  );
}

export default MainPage;