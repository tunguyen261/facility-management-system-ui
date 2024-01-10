import httpClient from 'utils/httpClient.js';

const path = '/category';

export const getCategoryList = (params = {}) => {
  return httpClient.get(path, { params });
};

export const getCategoryDetail = (id) => {
    return httpClient.get(`${path}/${id}`);
  };
  
  export const createCategory = (params) => {
    return httpClient.post(`${path}`, params);
  };
  
  export const updateCategory = (params) => {
    return httpClient.put(`${path}/${params?.id}`, params);
  };
  
  export const deleteCategory = (list_id = []) => {
    return httpClient.delete(`${path}`, { data: { list_id } });
  };
  
