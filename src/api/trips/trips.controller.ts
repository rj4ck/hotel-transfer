import { Request, Response, NextFunction } from 'express';
import CurrentUserQuery from './queries/current-user.query';

class TripsController {
    public static async currentUser(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            const publicAddress = req.headers.host;

            const homeLocation = await CurrentUserQuery.execute(publicAddress);

            res.status(200).json({ homeLocation });

        } catch (error) {
            next(error);
        }
    }
}

export default TripsController;
