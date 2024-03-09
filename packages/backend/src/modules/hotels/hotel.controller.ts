import { Request, Response, NextFunction } from 'express';
import SearchHotelQuery from './queries/search.hotel.query';

class HotelController {
	public static async search(req: Request, res: Response, next: NextFunction): Promise<void> {

		try {

			const spotsAvailable = await SearchHotelQuery.execute(req.body);

			res.status(200).json(spotsAvailable);

		} catch (error) {
			next(error);
		}
	}
}

export default HotelController;
