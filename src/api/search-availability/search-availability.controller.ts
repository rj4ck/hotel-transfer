import { Request, Response, NextFunction } from 'express';
import SearchAvailabilityQuery from "./queries/search-avalilability.query";
import { IServiceAvailableRequest } from "@/entities/services-availability.entity";

class SearchAvailabilityController {
    public static async search(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            const payload: IServiceAvailableRequest = {
                ...req.body,
                language: 'en',
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
