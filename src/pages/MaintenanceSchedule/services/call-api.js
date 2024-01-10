import httpClient from 'utils/httpClient.js';

const path = '/maintenance-schedule';

export const getMaintenanceScheduleList = (params = {}) => {
  return httpClient.get(path, { params });
};

export const getMaintenanceScheduleDetail = (id) => {
    return httpClient.get(`${path}/${id}`);
  };
  
  export const createMaintenanceSchedule = (params) => {
    return httpClient.post(`${path}`, params);
  };
  
  export const updateMaintenanceSchedule = (params) => {
    return httpClient.put(`${path}/${params?.id}`, params);
  };
  
  export const deleteMaintenanceSchedule = (list_id = []) => {
    return httpClient.delete(`${path}`, { data: { list_id } });
  };
  
