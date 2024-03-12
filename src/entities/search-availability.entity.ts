import { LocationsTypes } from "@/dto/locations.dtos";

export interface ISearchAvailability {
    outbound: Date;
    inbound?: Date;
    adults: number;
    toCode: string;
    infants: number;
    children: number;
    language: string;
    fromCode: string;
    toType: LocationsTypes;
    fromType: LocationsTypes;
}
