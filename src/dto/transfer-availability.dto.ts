import {
    IPaxes,
    ILocation,
    ITransfers,
    LocationsTypes,
    IPickupInformation
} from "@/entities";

interface IDateFormat {
    date: string;
    time: string;
}

interface IServiceAvailableData extends ITransfers {
    paxes?: IPaxes[];
    pickupInformation?: IPickupInformation;
}

export interface IServiceAvailableRequest {
    adults: number;
    toCode: string;
    infants: number;
    children: number;
    language: string;
    fromCode: string;
    outbound: string;
    inbound?: string;
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
        to: ILocation
        from: ILocation,
    };
    services: IServiceAvailableData[]
}
