import httpClient from 'utils/httpClient.js';

export const getListNotify = (url, page) => {
  const params = {
    page,
    page_size: 10,
    // type,
  };
  return httpClient.get(url, { params });
};

export const updateNofifyStatus = (id) => {
  return httpClient.put(`/notification/${id}`);
};

export const getOptionsGlobal = (params) => {
  return httpClient.get('/global/options', { params });
};

export const getFullName = (params) => {
  return httpClient.get('/global/get-full-name', { params });
};
