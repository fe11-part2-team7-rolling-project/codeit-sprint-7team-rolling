import React from "react";
import { Link } from "react-router-dom";
import ListCard from "../components/listPage/ListCard";
import Header from "../components/Layout/Header";

function ListPage() {
  return (
    <div>
      <Header />
      <div className="flex flex-col gap-[66px] min-[376px]:gap-[156px] min-[769px]:gap-[64px] min-[1025px]:items-center">
        <div className=" flex flex-col gap-[74px] min-[376px]:gap-[50px] min-[1025px]:items-start min-[1025px]:w-[1200px] ">
          <div className="pt-10 flex flex-col gap-3 min-[376px]:gap-4">
            <div className="pl-5 font-bold text-Black text-xl leading-9 min-[376px]:text-2xl min-[1025px]:pl-0">
              인기 롤링 페이퍼🔥
            </div>
            <ListCard type="hot" sortType="messageCount" />
          </div>

          <div className="flex flex-col gap-3 min-[376px]:gap-4">
            <div className="pl-5 font-bold text-Black text-xl leading-9 min-[376px]:text-2xl min-[1025px]:pl-0">
              최근에 만든 롤링페이퍼⭐️
            </div>
            <ListCard type="latest" sortType="latest" />
          </div>
        </div>
        <div className="flex justify-center">
          <Link to="/post">
            <button
              type="button"
              className="bg-purple600 text-lg font-light text-white leading-7 rounded-xl w-80 h-14"
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
