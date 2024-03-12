import { Request, Response, NextFunction } from 'express';
import SearchAvailabilityQuery from "./queries/search-avalilability.query";

class SearchAvailabilityController {
    public static async search(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            const payload = {
                adults: 2,
                infants: 0,
                children: 0,
                language: 'es',
                toType: 'ATLAS',
                toCode: '57',
                fromType: 'IATA',
                fromCode: 'BCN',
                outbound: '2024-03-20T12:00:00',
                ...req.body
            }

            console.log(payload)

            const response = await SearchAvailabilityQuery.execute(payload);

            res.status(200).json(response);

        } catch (error) {
            console.log(error)
            next(error);
        }
    }
}

export default SearchAvailabilityController;
