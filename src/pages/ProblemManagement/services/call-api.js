import httpClient from 'utils/httpClient.js';

const path = '/repairation';

export const getAssetTypeList = (params = {}) => {
  return httpClient.get(path, { params });
};

export const getAssetTypeDetail = (id) => {
    return httpClient.get(`${path}/${id}`);
  };
  
  export const createAssetType = (params) => {
    return httpClient.post(`${path}`, params);
  };
  
  export const updateAssetType = (params) => {
    return httpClient.put(`${path}/${params?.id}`, params);
  };
  
  export const deleteAssetType = (list_id = []) => {
    return httpClient.delete(`${path}`, { data: { list_id } });
  };
  
