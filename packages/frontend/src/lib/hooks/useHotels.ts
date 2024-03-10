import React from 'react';
import apiRequest from '@/lib/apiRequest';
import { IHotels, IHotelsRequest } from '@/lib/entities';

interface IUseHotels {
	hotels: IHotels[];
	isLoading: boolean;
	fetchHotels: (parameters: IHotelsRequest) => Promise<void>;
}
const useHotels = () => {
	const [startDate, setStartDate] = React.useState(new Date())
	const [endDate, setEndDate] = React.useState(new Date())
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [hotels, setHotels] = React.useState<any[]>([]);

	const fetchHotels = async (parameters: IHotelsRequest) => {
		setIsLoading(true);

		try {
			const payload = {
				stay: {
					checkIn: startDate.toISOString().slice(0, 10),
					checkOut: endDate.toISOString().slice(0, 10)
				},
				"occupancies": [
					{
						"rooms": 1,
						"adults": 2,
						"children": 0
					}
				],
			}

			console.log(payload)

			const response = await apiRequest.post('/hotels/search', payload);

			setHotels(response);
		} finally {
			setIsLoading(false);
		}
	};

	React.useEffect(() => {
		if (hotels.length < 1) {
			//fetchHotels({ checkIn: startDate.toISOString().slice(0, 10), checkOut: startDate.toISOString().slice(0, 10) })
		}
	}, [])

	const memoizedValue = React.useMemo(() => {
		return {
			hotels,
			isLoading,
		};
	}, [hotels, isLoading]);

	return {
		...memoizedValue,
		fetchHotels
	};
}

export default useHotels
