import React, { useEffect, useState } from "react";
import getList from "../listApi";

function LatestList() {
  const [latestList, setLatestList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getList(8, 0); // 최신순 정렬이 기본값이므로 sort 파라미터를 생략합니다.
        setLatestList(data.results);
      } catch (err) {
        setError("데이터를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="grid gap-4">
      {latestList.map((item) => (
        <div key={item.id} className="p-4 bg-gray-200 rounded-lg">
          {/* item의 속성에 맞게 데이터 표시 */}
          <h3 className="font-bold">{item.title || "제목 없음"}</h3>
          <p>{item.description || "설명 없음"}</p>
        </div>
      ))}
    </div>
  );
}

export default LatestList;
