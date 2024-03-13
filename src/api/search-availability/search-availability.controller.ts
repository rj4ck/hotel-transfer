import { Request, Response, NextFunction } from 'express';
import SearchAvailabilityQuery from "./queries/search-avalilability.query";
import { IServiceAvailableRequest } from "@/entities/services-availability.entity";

class SearchAvailabilityController {
    public static async search(req: Request, res: Response, next: NextFunction): Promise<void> {

        const { toCode, toType, fromCode, fromType } = req.body

        try {
            const payload: IServiceAvailableRequest = {
                adults: 2,
                infants: 0,
                children: 0,
                language: 'en',
                toType,
                toCode,
                fromType,
                fromCode,
                outbound: '2024-03-20T12:00:00',
            }

            const servicesAvailable = await SearchAvailabilityQuery.execute(payload);

            res.status(200).json(servicesAvailable);

        } catch (error) {
            console.log(error)
            next(error);
        }
    }
}

export default SearchAvailabilityController;
