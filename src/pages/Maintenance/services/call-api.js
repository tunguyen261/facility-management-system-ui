import httpClient from 'utils/httpClient.js';

const path = '/maintenance';

export const getMaintenanceList = (params = {}) => {
  return httpClient.get(path, { params });
};

export const getMaintenanceDetail = (id) => {
    return httpClient.get(`${path}/${id}`);
  };
  
  export const createMaintenance = (params) => {
    return httpClient.post(`${path}`, params);
  };

  export const createMaintenanceMulti = (params) => {
    return httpClient.post(`${path}/multi`, params);
  };
  
  export const updateMaintenance = (params) => {
    return httpClient.put(`${path}/${params?.id}`, params);
  };
  
  export const deleteMaintenance = (list_id = []) => {
    return httpClient.delete(`${path}`, { data: { list_id } });
  };
  
  export const updateStatusRequest = (id,data) => { 
    return httpClient.put(`${path}/status-update/${id}`, data);
  };