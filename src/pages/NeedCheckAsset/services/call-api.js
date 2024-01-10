import httpClient from 'utils/httpClient.js';

const path = '/asset';

export const getAssetList = (params = {}) => {
  return httpClient.get(path, { params });
};