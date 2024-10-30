import instance from '../axiosInstance';

export async function getRecipients(id) {
  try {
    const { data } = await instance.get(`/11-7/recipients/${id}/`);
    return data;
  } catch (error) {
    throw new Error('롤링 페이퍼를 불러오는데 실패했습니다.');
  }
}

export async function getRecipientsMessage(id) {
  try {
    const { data } = await instance.get(`/11-7/recipients/${id}/messages/`);
    return data;
  } catch (error) {
    throw new Error('롤링 페이퍼의 메시지를 불러오는데 실패했습니다.');
  }
}
