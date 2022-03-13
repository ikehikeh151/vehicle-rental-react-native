import axios from 'axios';
// import { API_URL } from '@env';
import { API_LOCAL } from '@env';

export const registerApi = body => {
  const url = API_LOCAL + '/auth/register';
  return axios.post(url, body);
};

export const loginApi = body => {
  const url = API_LOCAL + '/auth/login';
  return axios.post(url, body);
};

export const logoutApi = config => {
  console.log('CONFIG', config);
  const url = API_LOCAL + '/auth/logout';
  return axios.delete(url, config);
};
