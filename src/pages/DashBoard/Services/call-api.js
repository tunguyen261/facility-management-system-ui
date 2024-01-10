import httpClient from 'utils/httpClient.js';

const path = '/dashboard';

export const getInfor = (params = {}) => {
  return httpClient.get(path, { params });
};

export const getAnalysisAssetInfor = (params = {}) => {
    return httpClient.get(`${path}/analysis-asset-status`);
  };
  
  export const getAnalysisTaskInfor = (params) => {
    return httpClient.get(`${path}/analysis-task-infor`, params);
  };
  
