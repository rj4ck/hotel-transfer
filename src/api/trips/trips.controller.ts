import { Request, Response, NextFunction } from 'express';
import CurrentUserQuery from './queries/current-user.query';
import ConfirmBookingCommand from "./commands/confirm-booking.command";

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

    public static async confirmBookingTransfer(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {

            const { transferType, flightReference, email, rateKey, firstName, lastName, direction, phoneNumber } = req.body;

            const payload = {
                language: "en",
                holder: {
                    email: email,
                    name: firstName,
                    surname: lastName,
                    phone: phoneNumber
                },
                transfers: [{
                    rateKey,
                    transferDetails: [{
                        direction,
                        type: transferType,
                        code: flightReference
                    }]
                }],
                welcomeMessage: `Welcome ${firstName} ${lastName}`
            }

            console.log({ payload })

            const confirmBooking = await ConfirmBookingCommand.execute(payload);

            res.status(200).json(confirmBooking);

        } catch (error) {
            console.log(error)
            next(error);
        }
    }
}

export default TripsController;
