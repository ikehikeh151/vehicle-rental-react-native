import axios from 'axios';
// import { API_URL } from '@env';
import { API_LOCAL } from '@env';

export const historyApi = () => {
  const url = API_LOCAL + '/history';
  return axios.get(url);
};

export const createHistoryApi = body => {
  const url = API_LOCAL + '/history';
  return axios.post(url, body);
};

export const historyByUserApi = name => {
  const url = API_LOCAL + `/history?cari=${name}&sort=desc&by=id`;
  return axios.get(url);
};
