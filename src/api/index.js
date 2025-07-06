import {client} from './config';

export const getRequest = url => client.get(url);
export const getFilterRequest = (url, payload) => client.get(url, payload);

export const postRequest = (url, payload = {}) => client.post(url, payload);
export const postWithFormRequest = (url, payload = {}) =>
  client.post(url, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const patchRequest = (url, payload = {}) => client.patch(url, payload);

export const putRequest = (url, payload = {}) => client.put(url, payload);

export const deleteRequest = (url, payload = {}) =>
  client.delete(url, {payload});
