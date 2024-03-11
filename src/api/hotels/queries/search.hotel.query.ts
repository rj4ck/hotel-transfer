import httpsRequest from '@/utils/httpsRequest';
import { ISearchHotelQuery, ISearchHotelResponse } from '../../../server/entities/hotels.entity';

class SearchHotelQuery {
	public static async execute (parameters: ISearchHotelQuery) {
		const data = await httpsRequest.post('/hotels', parameters) as ISearchHotelResponse;

		const { hotels } = data;

		return { ...hotels };
	}
}

export default SearchHotelQuery;
