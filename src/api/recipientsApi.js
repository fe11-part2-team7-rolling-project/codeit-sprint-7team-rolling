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

// recipient 리스트 가져오기 (전체 카드 리스트)
export async function getCardList() {
  return apiRequest({
    method: 'GET',
    endpoint: `/11-7/recipients/`,
    errorMessage: '롤링 페이퍼 리스트를 불러오는데 실패했습니다.',
  });
}

// recipient 삭제하기 (전체 롤링페이퍼 삭제)
export async function deleteRecipient(id) {
  try {
    const response = await axiosInstance.delete(`/11-7/recipients/${id}/`);
    return response.data;
  } catch (error) {
    throw new Error('전체 롤링 페이퍼를 삭제하는 데 실패했습니다.');
  }
}

// 특정 메시지 삭제하기 (개별 메시지 삭제 기능)
export async function deleteMessage(messageId) {
  try {
    const response = await axiosInstance.delete(`/11-7/messages/${messageId}/`);
    return response.data;
  } catch (error) {
    console.error('Error details:', error);
    throw new Error('롤링 페이퍼의 메시지를 삭제하는 데 실패했습니다.');
  }
}



