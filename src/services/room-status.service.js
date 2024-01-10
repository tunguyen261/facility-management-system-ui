import httpClient from 'utils/httpClient.js';

const path = '/room-status';

export const getRoomStatusList = (params = {}) => {
  return httpClient.get(path, { params });
};

export const getRoomStatusDetail = (id) => {
  return httpClient.get(`${path}/${id}`);
};

export const createRoomStatus = (params) => {
  return httpClient.post(`${path}`, params);
};

export const updateRoomStatus = (params) => {
  return httpClient.put(`${path}/${params?.id}`, params);
};

export const deleteRoomStatus = (id) => {
  return httpClient.delete(`${path}/${id}`);
};

export const getRoomStatusOptions = (params = {}) => {
  return httpClient.get(`${path}/get-options`, { params });
};
