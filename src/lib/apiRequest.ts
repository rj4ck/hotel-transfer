import axios, { AxiosError } from 'axios';
import Toast from 'react-native-toast-message';

const { API_URL } = process.env;

const api = axios.create({
  baseURL: 'http://localhost:1337',
  timeout: 60000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    //token: '2ec598b8067154f91744375b14733f76',
  },
});

api.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      const responseData: any = axiosError.response?.data;

      /*Toast.show({
        type: 'error',
        text1: 'Error',
        text2: responseData.message,
      });*/

      return Promise.reject(responseData);
    } else if (error.request) {
      console.error('No se recibió respuesta del servidor:', error.request);
    } else {
      console.error('Error al realizar la solicitud:', error.message);
    }

    return Promise.reject(error);
  },
);

export default api;
