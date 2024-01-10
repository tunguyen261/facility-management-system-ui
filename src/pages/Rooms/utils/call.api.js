import httpClient from 'utils/httpClient.js';

const path = '/room-status';

export const getRoomStatus = (params = {}) => {
  return httpClient.get(path, { params });
};

export const getRoomType = (params = {}) => {
  return httpClient.get('', { params });
};

export const getAssetInRoom = (id,data ) => {
  return httpClient.get(`/asset/room/${id}`,data);
};
