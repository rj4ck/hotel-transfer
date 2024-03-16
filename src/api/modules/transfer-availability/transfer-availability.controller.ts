import { Request, Response, NextFunction } from 'express';
import { IServiceAvailableRequest } from "@/dto/transfer-availability.dto";
import SearchAvailabilityQuery from "./queries/transfer-avalilability.query";

class TransferAvailabilityController {
    public static async search(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            const payload: IServiceAvailableRequest = {
                ...req.body,
                language: 'en',
            }

            const servicesAvailable = await SearchAvailabilityQuery.execute(payload);

            res.status(200).json(servicesAvailable);

        } catch (error) {
            next(error);
        }
    }
}

export default TransferAvailabilityController;
