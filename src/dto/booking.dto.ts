import { IPaxes, IHolder, IBooking, ITransfers, IPickupInformation } from "@/entities";

interface ITransferData extends ITransfers {
    paxes: IPaxes[];
    pickupInformation: IPickupInformation;
    arrivalShipName: string;
    arrivalTrainInfo: string;
    departureShipName: string;
    departureTrainInfo: string;
    arrivalFlightNumber: string;
    departureFlightNumber: string;
    sourceMarketEmergencyNumber: string;
}
export interface IConfirmBookingTransferRequest {
    remark?: string;
    holder: IHolder;
    language: string;
    welcomeMessage: string;
    transfers: ITransfers[];
    clientReference?: string;
}

interface IBookingData extends IBooking {
    holder: IHolder;
    transfers: ITransferData[];
}

export interface IConfirmBookingTransferResponse {
    bookings: IBookingData[]
}
