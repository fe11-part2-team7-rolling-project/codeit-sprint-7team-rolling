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

    return data.results || [];
  } catch (error) {
    throw error.message;
  }
}

export default getList;
