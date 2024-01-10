import httpClient from 'utils/httpClient.js';

const path = '/campus';

export const getCampusList = (params = {}) => {
  return httpClient.get('/campus', { params });
};

export const getCampusDetail = (id) => {
  return httpClient.get(`${path}/${id}`);
};

export const createCampus = (params) => {
  return httpClient.post(`${path}`, params);
};

export const updateCampus = (params) => {
  return httpClient.put(`${path}/${params?.id}`, params);
};

export const deleteCampus = (id ) => {
  return httpClient.delete(`${path}/${id}`);
};

export const getCampusOptions = (params = {}) => {
  return httpClient.get(`${path}/get-options`, { params });
};
