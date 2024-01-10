import httpClient from 'utils/httpClient.js';



export const getFloorList = (params = {}) => {
  return httpClient.get('/floor', { params });
};

export const getFloorDetail = (id) => {
    return httpClient.get(`/floor/${id}`);
  };
export const getRoomByFloorId = (params = {}) => {
    return httpClient.get(`/virtualize/rooms`, { params });
  };

  export const getRoomStatus = (params = {}) => {
    return httpClient.get('/room-status', { params });
  };

  export const getSummary = (params = {}) => {
    return httpClient.get('/virtualize/virtualize-dashboard', { params });
  };
