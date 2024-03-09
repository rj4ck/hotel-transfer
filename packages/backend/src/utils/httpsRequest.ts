import crypto from 'crypto';
import axios, { AxiosError } from 'axios';
import { hotelBeds } from '../configs';

const api = axios.create({
	baseURL: hotelBeds.domain,
	timeout: 60000,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		'Api-key': hotelBeds.apiKey,
	},
});

api.interceptors.request.use(
	config => {
		const timestamp = Math.floor(Date.now() / 1000);

		config.headers['X-Signature'] = crypto.createHash('sha256').update(hotelBeds.apiKey + hotelBeds.apiSecret + timestamp).digest('hex');

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
			const responseData: unknown = axiosError.response?.data;

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
