import axios from 'axios';
// import { API_URL } from '@env';
import { API_LOCAL } from '@env';

export const getVehicleByIdApi = id => {
  const url = API_LOCAL + '/vehicles/' + id;
  return axios.get(url);
};

export const getVehiclesPopularApi = () => {
  const url = API_LOCAL + '/history/popular';
  return axios.get(url);
};

export const getVehiclesBikeApi = () => {
  const url = `${API_LOCAL}/vehicles?filter=bike`;
  return axios.get(url);
};

export const getVehiclesMotorBikeApi = () => {
  const url = `${API_LOCAL}/vehicles?filter=motorbike`;
  return axios.get(url);
};

export const getVehiclesCarsApi = () => {
  const url = `${API_LOCAL}/vehicles?filter=cars`;
  return axios.get(url);
};

export const getCategoryApi = () => {
  const url = `${API_LOCAL}/category`;
  return axios.get(url);
};

export const getStatusApi = () => {
  const url = `${API_LOCAL}/status`;
  return axios.get(url);
};

export const getLocationApi = () => {
  const url = `${API_LOCAL}/location`;
  return axios.get(url);
};

export const editVehicleApi = (token, body, id) => {
  const url = `${API_LOCAL}/vehicles/${id}`;
  return axios.patch(url, body, {
    headers: {
      'x-access-token': token,
    },
  });
};

export const deleteVehicleAPi = id => {
  const url = `${API_LOCAL}/vehicles/${id}`;
  return axios.delete(url);
};

export const addVehicleApi = async (body, token) => {
  const url = API_LOCAL + '/vehicles/';
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
