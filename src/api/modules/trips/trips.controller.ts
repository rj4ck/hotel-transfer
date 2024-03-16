import { Request, Response, NextFunction } from 'express';
import { IConfirmBookingTransferRequest } from "@/dto";
import GetBookingQuery from "./queries/get-booking.query";
import CurrentUserQuery from './queries/current-user.query';
import CancelBookingCommand from "./commands/cancel-booking.command";
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
                        type: "FLIGHT",
                        code: flightReference
                    }]
                }],
                welcomeMessage: `Welcome ${firstName} ${lastName}`,
                clientReference: 'BOSTON#12-203#456754'
            } as IConfirmBookingTransferRequest

            console.log({ payload })

            const confirmBooking = await ConfirmBookingCommand.execute(payload);

            res.status(200).json(confirmBooking);

        } catch (error) {
            next(error);
        }
    }

    public static async getBookingTransfer(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {

            const { reference } = req.params;

            const bookingTransfer = await GetBookingQuery.execute(reference);

            res.status(200).json(bookingTransfer);

        } catch (error) {
            next(error);
        }
    }

    public static async cancelBookingTransfer(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {

            const { reference } = req.params;

            await CancelBookingCommand.execute(reference);

            res.status(200).json({ message: 'Transfer cancel' });

        } catch (error) {
            next(error);
        }
    }
}

export default TripsController;
