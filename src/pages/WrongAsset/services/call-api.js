import httpClient from 'utils/httpClient.js';

const path = '/asset';

export const getAssetList = (params = {}) => {
  return httpClient.get(path, { params });
};

export const getAssetDetail = (id) => {
    return httpClient.get(`${path}/${id}`);
  };
  
  export const createAsset = (params) => {
    return httpClient.post(`${path}`, params);
  };
  
  export const updateAsset = (params) => {
    return httpClient.put(`${path}/${params?.id}`, params);
  };
  
  export const deleteAsset = (list_id = []) => {
    return httpClient.delete(`${path}`, { data: { list_id } });
  };

  export const getAssetTypeOpts = (params = {}) => {
    return httpClient.get('/asset-type', { params });
  };
 
  export const getAssetRepairation = (id) => {
    return httpClient.get(`${path}/repairation/${id}`);
  };

  export const getAssetMaintenance = (id) => {
    return httpClient.get(`${path}/maintenance/${id}`);
  };

  export const getAssetTransportation = (id) => {
    return httpClient.get(`${path}/transportation/${id}`);
  };

  export const getAssetReplacement = (id) => {
    return httpClient.get(`${path}/replacement/${id}`);
  };

  export const downloadTemplate = (_data) => {
    const header = {
      responseType: `blob`,
    };
    return httpClient.get(`/import`, header);
  };

  export const importExcel = (file) => {
    let formData = new FormData();
    formData.append(`file`, file);
    return httpClient.post(`/import`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };