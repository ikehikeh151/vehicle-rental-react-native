import axios from 'axios';
// import { API_URL } from '@env';
import { API_LOCAL } from '@env';

export const getUserByIdApi = token => {
  const config = {
    headers: {
      'x-access-token': token,
    },
  };
  const url = API_LOCAL + '/users/detail';
  return axios.get(url, config);
};
