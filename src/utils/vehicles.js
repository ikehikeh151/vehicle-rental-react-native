import axios from 'axios';
import { API_URL } from '@env';

export const getVehicleByIdApi = id => {
  const url = API_URL + '/vehicles/' + id;
  return axios.get(url);
};

export const getVehiclesPopularApi = () => {
  const url = API_URL + '/history/popular';
  return axios.get(url);
};

export const getVehiclesBikeApi = () => {
  const url = `${API_URL}/vehicles?filter=bike`;
  return axios.get(url);
};

export const getVehiclesMotorBikeApi = () => {
  const url = `${API_URL}/vehicles?filter=motorbike`;
  return axios.get(url);
};

export const getVehiclesCarsApi = () => {
  const url = `${API_URL}/vehicles?filter=cars`;
  return axios.get(url);
};

export const getCategoryApi = () => {
  const url = `${API_URL}/category`;
  return axios.get(url);
};

export const getStatusApi = () => {
  const url = `${API_URL}/status`;
  return axios.get(url);
};

export const getLocationApi = () => {
  const url = `${API_URL}/location`;
  return axios.get(url);
};

export const addVehicleApi = (config, body) => {
  const url = `${API_URL}/vehicles`;
  console.log('CONFIG-UTILS', config);
  return axios.post(url, body, config);
};

export const editVehicleApi = (token, body, id) => {
  const url = `${API_URL}/vehicles/${id}`;
  return axios.patch(url, body, {
    headers: {
      'x-access-token': token,
    },
  });
};

export const deleteVehicleAPi = id => {
  const url = `${API_URL}/vehicles/${id}`;
  return axios.delete(url);
};
