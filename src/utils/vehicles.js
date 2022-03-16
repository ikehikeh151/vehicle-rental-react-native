import axios from 'axios';
// import { API_URL } from '@env';
import { API_URL } from '@env';

export const getVehicleByIdApi = id => {
  const url = API_URL + '/vehicles/' + id;
  return axios.get(url);
};

export const getVehiclesSearchApi = (keyword, filter) => {
  console.log(keyword.length);
  console.log('FILTER >>>', filter);
  const url = API_URL + `/vehicles?cari=${keyword}&filter=${filter}`;
  return axios.get(url);
};

export const getVehiclesPopularApi = () => {
  const url = API_URL + '/history/popular';
  return axios.get(url);
};

export const getVehiclesBikeApi = () => {
  const url = `${API_URL}/vehicles?sort=desc&by=id&filter=bike`;
  return axios.get(url);
};

export const getVehiclesMotorBikeApi = () => {
  const url = `${API_URL}/vehicles?sort=desc&by=id&filter=motorbike`;
  return axios.get(url);
};

export const getVehiclesCarsApi = () => {
  const url = `${API_URL}/vehicles?sort=desc&by=id&filter=cars`;
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

export const addVehicleApi = async (body, token) => {
  const url = API_URL + '/vehicles/';
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-access-token': token,
    },
    body: body,
  });
  return res;
};
