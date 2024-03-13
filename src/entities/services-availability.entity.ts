import { LocationsTypes } from "@/dto/locations.dtos";
import { IServicesAvailable } from "@/dto/services-available.dtos";

interface IDateFormat {
    date: string;
    time: string;
}

export interface IServiceAvailableRequest {
    outbound: string;
    inbound?: string;
    adults: number;
    toCode: string;
    infants: number;
    children: number;
    language: string;
    fromCode: string;
    toType: LocationsTypes;
    fromType: LocationsTypes;
}

export interface IServiceAvailableResponse {
    search: {
        language: string;
        departure: IDateFormat,
        comeBack: IDateFormat,
        occupancy: {
            adults: number;
            infants: number;
            children: number;
        },
        from: {
            code: string;
            type: string;
            description: string;
        },
        to: {
            code: string;
            type: string;
            description: string;
        }
    };
    services: IServicesAvailable[]
}
