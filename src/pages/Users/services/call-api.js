import httpClient from 'utils/httpClient.js';

const path = '/user';

export const getListUser = (params = {}) => {
  return httpClient.get(path, { params });
};

export const getUserDetail = (id) => {
    return httpClient.get(`${path}/${id}`);
  };
  
  export const createUser = (params) => {
    return httpClient.post(`${path}`, params);
  };
  
  export const updateUser = (params) => {
    return httpClient.put(`${path}/${params?.id}`, params);
  };
  
  export const deleteUser = (list_id = []) => {
    return httpClient.delete(`${path}`, { data: { list_id } });
  };

  export const getListUserByCategory = (id ) => {
    return httpClient.get(`${path}/category/${id}`,);
  };

  export const getAssetRepairation = (params) => {
    return httpClient.get(`/repairation`, { params});
  };

  export const getAssetMaintenance = (params) => {
    return httpClient.get(`/maintenance`, { params});
  };

  export const getAssetTransportation = (params) => {
    return httpClient.get(`/transportation`, { params});
  };

  export const getAssetReplacement = (params) => {
    return httpClient.get(`/replacement`, { params});
  };
