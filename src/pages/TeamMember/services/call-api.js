import httpClient from 'utils/httpClient.js';

const path = '/team-member';

export const getTeamMemberList = (params = {}) => {
  return httpClient.get(path, { params });
};

export const getTeamMemberDetail = (id) => {
    return httpClient.get(`${path}/${id}`);
  };
  
  export const createTeamMember = (params) => {
    return httpClient.post(`${path}`, params);
  };
  
  export const updateTeamMember = (params) => {
    return httpClient.put(`${path}/${params?.id}`, params);
  };
  
  export const deleteTeamMember = (list_id = []) => {
    return httpClient.delete(`${path}`, { data: { list_id } });
  };
  
