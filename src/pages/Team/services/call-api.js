import httpClient from 'utils/httpClient.js';

const path = '/team';

export const getTeamList = (params = {}) => {
  return httpClient.get(path, { params });
};

export const getTeamDetail = (id) => {
    return httpClient.get(`${path}/${id}`);
  };
  
  export const createTeam = (params) => {
    return httpClient.post(`${path}`, params);
  };
  
  export const updateTeam = (params) => {
    return httpClient.put(`${path}/${params?.id}`, params);
  };
  
  export const deleteTeam = (list_id = []) => {
    return httpClient.delete(`${path}`, { data: { list_id } });
  };
  
