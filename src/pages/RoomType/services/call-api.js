import httpClient from 'utils/httpClient.js';

const path = '/room-type';

export const getRoomTypeList = (params = {}) => {
  return httpClient.get(path, { params });
};

export const getRoomTypeDetail = (id) => {
    return httpClient.get(`${path}/${id}`);
  };
  
  export const createRoomType = (params) => {
    return httpClient.post(`${path}`, params);
  };
  
  export const updateRoomType = (params) => {
    return httpClient.put(`${path}/${params?.id}`, params);
  };
  
  export const deleteRoomType = (list_id = []) => {
    return httpClient.delete(`${path}`, { data: { list_id } });
  };
  
