import httpClient from 'utils/httpClient.js';

const path = '/repair';

export const getRepairationList = (params = {}) => {
  return httpClient.get(path, { params });
};

export const getRepairationDetail = (id) => {
    return httpClient.get(`${path}/${id}`);
  };
  
  export const createRepairation = (params) => {
    return httpClient.post(`${path}`, params);
  };

  export const createRepairationMutil = (params) => {
    return httpClient.post(`${path}/multi`, params);
  };
  
  export const updateRepairation = (params) => {
    return httpClient.put(`${path}/${params?.id}`, params);
  };
  
  export const deleteRepairation = (id ) => {
    return httpClient.delete(`${path}/${id}`);
  };


  export const updateStatusRequest = (id,data) => { 
    return httpClient.put(`${path}/status-update/${id}`, data);
  };

  
