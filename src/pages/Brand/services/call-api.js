import httpClient from 'utils/httpClient.js';

const path = '/brand';

export const getBrandList = (params = {}) => {
  return httpClient.get(path, { params });
};

export const getBrandDetail = (id) => {
    return httpClient.get(`${path}/${id}`);
  };
  
  export const createBrand = (params) => {
    return httpClient.post(`${path}`, params);
  };
  
  export const updateBrand = (params) => {
    return httpClient.put(`${path}/${params?.id}`, params);
  };
  
  export const deleteBrand = (id ) => {
    return httpClient.delete(`${path}/${id}`);
  };
  
