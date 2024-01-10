import httpClient from 'utils/httpClient.js';

const path = '/inventory-check-config';


export const getInventoryCheckList = (params = {}) => {
  return httpClient.get(path, { params });
};

export const getInventoryCheckDetail = (id) => {
    return httpClient.get(`${path}`);
  };
  
  export const createInventoryCheck = (params) => {
    return httpClient.post(`${path}`, params);
  };
  
  export const updateInventoryCheck = (params) => {
    return httpClient.put(`${path}/${params?.id}`, params);
  };
  
  export const deleteInventoryCheck = (id ) => {
    return httpClient.delete(`${path}/${id}`);
  };
  
