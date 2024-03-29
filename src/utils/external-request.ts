import axios, { AxiosError } from 'axios';

const createApiClient = (domain: string, headers?: Record<string, unknown>) => {
	const api = axios.create({
		baseURL: domain,
		//timeout: 60000,
		headers
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
				const responseData: unknown = axiosError.response?.data;

				return Promise.reject(responseData);
			}

			return Promise.reject(error);
		},
	);

	return api;
};

export default createApiClient;
