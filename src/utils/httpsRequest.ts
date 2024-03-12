import axios, { AxiosError } from 'axios';

const createApiClient = (domain: string, headers: Record<string, unknown>) => {
	const api = axios.create({
		baseURL: domain,
		timeout: 60000,
		headers
	});

	api.interceptors.request.use(
		config => {
			console.log('=====', config)
			return config;
		},
		error => {
			console.log('=====', error)
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

	return api;
};

export default createApiClient;
