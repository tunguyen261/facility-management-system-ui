import httpClient from 'utils/httpClient.js';

const path = '/transportation';

export const getTransportationList = (params = {}) => {
  return httpClient.get(path, { params });
};

export const getTransportationDetail = (id) => {
    return httpClient.get(`${path}/${id}`);
  };
  
  export const createTransportation = (params) => {
    return httpClient.post(`${path}`, params);
  };
  
  export const updateTransportation = (params) => {
    return httpClient.put(`${path}/${params?.id}`, params);
  };
  
  export const deleteTransportation = (id ) => {
    // const outputArray = [];
    // for (let i = 0; i < list_id.length; i++) {
    //   const item = list_id[i];
    //   outputArray.push(`${item}`);
    // }
    return httpClient.delete(`${path}/${id}`);
  };

  export const getAssetInRoom = (id ) => {
    return httpClient.get(`/asset/room/${id}`);
  };
  
  export const downloadTemplate = (_data) => {
    const header = {
      responseType: `blob`,
    };
    return httpClient.get(`/import/transport-template`, header);
  };

  export const importExcel = (file) => {
    let formData = new FormData();
    formData.append(`file`, file);
    return httpClient.post(`/import/asset-transport`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  export const updateStatusRequest = (id,data) => { 
    return httpClient.put(`${path}/status-update/${id}`, data);
  };
