import instance from '../axiosInstance';

async function getRecipents(id) {
  try {
    const { data } = await instance.get(`/11-7/recipients/${id}/`);
    return data;
  } catch (error) {
    throw new Error('롤링 페이퍼를 불러오는데 실패했습니다.');
  }
}

export default getRecipents;
