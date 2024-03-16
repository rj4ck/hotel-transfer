import { toast } from "react-toastify";

const createApiClient = (path: string) => {
	const fetchApi = async (init?: RequestInit) => {
		try {
			const response = await fetch(`/api/${path}`, {
				...init,
				headers: {
					'Content-Type': 'application/json'
				},
			});

			const data = await response.json();

			if (!response.ok) {
				const error = data as Error;

				throw new Error(error.message)
			}
			return data;
		} catch (error) {
			const errorData = error as Error

			toast.error(errorData.message)
		}
	};

	return {
		get: async () => {

			return await fetchApi({
				method: 'GET'
			});
		},
		post: async <T>(data: T) => {
			return await fetchApi({
				method: 'POST',
				body: JSON.stringify(data)
			});
		},
	};
};

export default createApiClient;
