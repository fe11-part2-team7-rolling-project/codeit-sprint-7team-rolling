import React from 'react';
import { Link } from 'react-router-dom';
import ListCard from '../components/listPage/ListCard';
import Header from '../components/Layout/Header';

function ListPage() {
  return (
    <div className="w-full min-h-screen dark:bg-dark1 pb-20">
      <Header />
      <div className="flex flex-col gap-[66px] mobile:gap-[156px] min-[769px]:gap-[64px] tablet:items-center">
        <div className="gap-[74px] tablet:items-start tablet:w-[1200px] ">
          <section className="pt-10 flex flex-col gap-3 mobile:gap-4 mb-[50px]">
            <h1 className="pl-5 font-bold text-black dark:text-gray200 text-xl leading-9 mobile:text-2xl tablet:pl-0">
              인기 롤링 페이퍼🔥
            </h1>
            <ListCard type="hot" sortType="messageCount" />
          </section>

          <section className="flex flex-col gap-3 mobile:gap-4">
            <h2 className="pl-5 font-bold text-black dark:text-gray200 text-xl leading-9 mobile:text-2xl tablet:pl-0">
              최근에 만든 롤링페이퍼⭐️
            </h2>
            <ListCard type="latest" sortType="latest" />
          </section>
        </div>
        <div className="flex justify-center">
          <Link to="/post">
            <button
              type="button"
              className="bg-purple600 text-lg font-light text-white leading-7 rounded-xl w-80 h-14 hover:bg-purple800"
            >
              나도 만들어보기
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ListPage;
