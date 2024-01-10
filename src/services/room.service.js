import httpClient from 'utils/httpClient.js';

const path = '/room';

export const getRoomList = (params = {}) => {
  return httpClient.get('/room', { params });
};

export const getRoomDetail = (id) => {
  return httpClient.get(`${path}/${id}`);
};

export const createRoom = (params) => {
  return httpClient.post(`${path}`, params);
};

export const updateRoom = (params) => {
  return httpClient.put(`${path}/${params?.id}`, params);
};

export const deleteRoom = (id) => {
  return httpClient.delete(`${path}/${id}`);
};

export const getRoomOptions = (params = {}) => {
  return httpClient.get(`${path}/get-options`, { params });
};

export const getRoomOptionsCBX = (params = {}) => {
  return httpClient.get('/combo-box/room', { params });
};
