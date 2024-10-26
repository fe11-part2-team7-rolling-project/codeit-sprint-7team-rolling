import instance from "./axiosInstance";

async function getList(params = {}) {
  try {
    const { data } = await instance.get("/list", { params });
    return data;
  } catch (error) {
    throw new Error("리스트를 불러오는데 실패했습니다.");
  }
}

export default getList;
