import httpClient from 'utils/httpClient.js';

const path = '/room-asset';

export const getRoomAssetList = (params = {}) => {
  return httpClient.get(path, { params });
};

export const getRoomAssetDetail = (id) => {
    return httpClient.get(`${path}/${id}`);
  };
  
  export const createRoomAsset = (params) => {
    return httpClient.post(`${path}`, params);
  };
  
  export const updateRoomAsset = (params) => {
    return httpClient.put(`${path}/${params?.id}`, params);
  };
  
  export const deleteRoomAsset = (list_id = []) => {
    return httpClient.delete(`${path}`, { data: { list_id } });
  };
  
