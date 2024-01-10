import httpClient from 'utils/httpClient.js';

const path = '/model';

export const getModelList = (params = {}) => {
  return httpClient.get(path, { params });
};

export const getModelDetail = (id) => {
    return httpClient.get(`${path}/${id}`);
  };
  
  export const createModel = (params) => {
    return httpClient.post(`${path}`, params);
  };
  
  export const updateModel = (params) => {
    return httpClient.put(`${path}/${params?.id}`, params);
  };
  
  export const deleteModel = (list_id = []) => {
    return httpClient.delete(`${path}`, { data: { list_id } });
  };
  
