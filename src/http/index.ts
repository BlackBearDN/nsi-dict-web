import axios from 'axios';

export const NSI_API_URL = 'https://dev.digitaltechs.io/nsi-dev-api';

export const $nsiApi = axios.create({
  withCredentials: true,
  baseURL: NSI_API_URL,
});

$nsiApi.interceptors.request.use((config) => {
  return config;
});
