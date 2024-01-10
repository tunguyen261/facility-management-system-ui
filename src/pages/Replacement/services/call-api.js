import httpClient from 'utils/httpClient.js';

const path = '/replacement';

export const getReplacementList = (params = {}) => {
  return httpClient.get(path, { params });
};

export const getReplacementDetail = (id) => {
    return httpClient.get(`${path}/${id}`);
  };
  
  export const createReplacement = (params) => {
    return httpClient.post(`${path}`, params);
  };
  
  export const updateReplacement = (params) => {
    return httpClient.put(`${path}/${params?.id}`, params);
  };
  
  export const deleteReplacement = (list_id = []) => {
    return httpClient.delete(`${path}`, { data: { list_id } });
  };
  
  export const updateStatusRequest = (id,data) => { 
    return httpClient.put(`${path}/status-update/${id}`, data);
  };
