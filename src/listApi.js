import instance from "./axiosInstance";

async function getList(limit, offset, sort) {
  try {
    const { data } = await instance.get("/11-7/recipients/", {
      params: {
        limit,
        offset,
        sort,
      },
    });

    // 'results' 필드의 배열 반환
    return data.results || [];
  } catch (error) {
    throw new Error("리스트를 불러오는데 실패했습니다.");
  }
}

export default getList;
