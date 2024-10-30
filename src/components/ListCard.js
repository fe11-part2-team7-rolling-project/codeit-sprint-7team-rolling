import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getList from "../listApi";
import arrowLeft from "../assets/arrow_left.svg";
import arrowRight from "../assets/arrow_right.svg";
import CardItem from "./CardItem";

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
            className="absolute top-[110px] left-[-20px] z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-100"
          >
            <span>
              <img src={arrowLeft} alt="왼쪽 화살표" />
            </span>
          </button>
        )}

        {/* 현재 페이지에 해당하는 카드들만 표시 */}
        {currentCards.map((item) => (
          <CardItem
            key={item.id}
            item={item}
            nav={nav}
            colorClassMap={colorClassMap}
          />
        ))}

        {/* 우측 화살표 버튼 */}
        {currentPage < totalPages - 1 && (
          <button
            type="button"
            onClick={() => setCurrentPage(currentPage + 1)}
            className="absolute top-[110px] right-[-20px] z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md border border-gray300"
          >
            <span>
              <img src={arrowRight} alt="오른쪽 화살표" />
            </span>
          </button>
        )}
      </div>

      {/* 모바일 및 태블릿 환경에서 가로 스크롤 */}
      <div className="flex gap-3 overflow-x-auto scrollbar-hide min-[1025px]:hidden min-[376px]:gap-5">
        {list.map((item) => (
          <CardItem
            key={item.id}
            item={item}
            nav={nav}
            colorClassMap={colorClassMap}
          />
        ))}
      </div>
    </div>
  );
}

export default ListCard;
