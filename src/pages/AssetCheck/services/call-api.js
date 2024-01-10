import httpClient from 'utils/httpClient.js';

const path = '/asset-check';

export const getAssetCheckList = (params = {}) => {
  return httpClient.get(path, { params });
};

export const getAssetCheckDetail = (id) => {
    return httpClient.get(`${path}/${id}`);
  };
  
  export const createAssetCheck = (params) => {
    return httpClient.post(`${path}`, params);
  };
  
  export const updateAssetCheck = (params) => {
    return httpClient.put(`${path}/${params?.id}`, params);
  };
  
  export const deleteAssetCheck = (list_id = []) => {
    return httpClient.delete(`${path}`, { data: { list_id } });
  };


  export const updateStatusRequest = (id,data) => { 
    return httpClient.put(`${path}/status-update/${id}`, data);
  };

  
