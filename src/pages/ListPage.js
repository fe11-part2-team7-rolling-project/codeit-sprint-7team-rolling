import React from "react";
import { Link } from "react-router-dom";
import HotList from "../components/HotList";
import LatestList from "../components/LatestList";

function ListPage() {
  return (
    <div className="flex flex-col gap-[66px] min-[376px]:gap-[156px] min-[769px]:gap-[64px]">
      <div className="pl-5 flex flex-col gap-[74px] min-[376px]:gap-[50px]">
        <div className="pt-10 flex flex-col gap-3 min-[376px]:gap-4">
          <div className="font-bold text-Black text-2xl leading-9 ">
            인기 롤링 페이퍼🔥
          </div>
          <HotList />
        </div>

        <div className="flex flex-col gap-3 min-[376px]:gap-4">
          <div className="font-bold text-Black text-2xl leading-9">
            최근에 만든 롤링페이퍼⭐️
          </div>
          <LatestList />
        </div>
      </div>
      <div className="flex justify-center">
        <Link to="/post">
          <button
            type="button"
            className="bg-purple600 text-lg text-white leading-7 rounded-xl w-80 h-14"
          >
            나도 만들어보기
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ListPage;
