import httpClient from 'utils/httpClient.js';

const path = '/building';

export const getBuildingList = (params = {}) => {
  return httpClient.get(`${path}`, { params });
};

export const getBuildingDetail = (id) => {
  return httpClient.get(`${path}/${id}`);
};

export const createBuilding = (params) => {
  return httpClient.post(`${path}`, params);
};

export const updateBuilding = (params) => {
  return httpClient.put(`${path}/${params?.id}`, params);
};

export const deleteBuilding = (id = []) => {
  return httpClient.delete(`${path}/${id}`);
};

export const getBuildingOptions = (params = {}) => {
  return httpClient.get(`${path}/get-options`, { params });
};
