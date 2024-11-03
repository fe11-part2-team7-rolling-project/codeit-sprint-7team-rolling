import axiosInstance from '../axiosInstance';

async function apiRequest({
  method = 'GET',
  endpoint,
  data = null,
  errorMessage,
}) {
  try {
    const response = await axiosInstance({
      method,
      url: endpoint,
      data,
    });
    return response.data;
  } catch (error) {
    throw new Error(errorMessage);
  }
}

export async function getRecipients(id) {
  return apiRequest({
    method: 'GET',
    endpoint: `/11-7/recipients/${id}/`,
    errorMessage: '롤링 페이퍼를 불러오는데 실패했습니다.',
  });
}

export async function getRecipientsMessage(id, limit = 8, offset = 0) {
  return apiRequest({
    method: 'GET',
    endpoint: `/11-7/recipients/${id}/messages/?limit=${limit}&offset=${offset}`,
    errorMessage: '롤링 페이퍼의 메시지를 불러오는데 실패했습니다.',
  });
}

export async function getRecipientsReactions(id) {
  return apiRequest({
    method: 'GET',
    endpoint: `/11-7/recipients/${id}/reactions/`,
    errorMessage: '롤링 페이퍼의 리액션을 불러오는데 실패했습니다.',
  });
}

export async function addRecipientReaction(id, data) {
  return apiRequest({
    method: 'POST',
    endpoint: `/11-7/recipients/${id}/reactions/`,
    data,
    errorMessage: '롤링 페이퍼 추가에 실패했습니다.',
  });
}
