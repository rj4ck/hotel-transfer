import { LocationsTypes } from "@/dto/locations.dtos";
import { IServicesAvailable } from "@/dto/services-available.dtos";

interface ITransferDetails {
    type: string,
    direction: string,
    code: string,
    companyName?: string
}
interface ITransfers {
    rateKey: string;
    transferDetails: ITransferDetails[];
}

export interface IConfirmBookingTransferRequest {
    language: string;
    holder: {
        name: string;
        surname: string;
        email: string;
        phone: string;
    };
    transfers: ITransfers[];
    clientReference:string;
    welcomeMessage:string;
    remark:string;
}

export interface IConfirmBookingTransferResponse {

}
