import httpClient from 'utils/httpClient.js';

const path = '/floor';

export const getFloorList = (params = {}) => {
  return httpClient.get('/floor', { params });
};

export const getFloorDetail = (id) => {
  return httpClient.get(`${path}/${id}`);
};

export const createFloor = (params) => {
  return httpClient.post(`${path}`, params,)
};

export const updateFloor = (params) => {
  return httpClient.put(`${path}/${params?.id}`, params,)
};

export const deleteFloor = (id ) => {
  return httpClient.delete(`${path}/${id}`);
};

export const getFloorOptions = (params = {}) => {
  return httpClient.get(`${path}/get-options`, { params });
};
