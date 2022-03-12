import axios from 'axios';
import { API_URL } from '@env';

export const historyApi = () => {
  const url = API_URL + '/history';
  return axios.get(url);
};

export const createHistoryApi = body => {
  const url = API_URL + '/history';
  return axios.post(url, body);
};
