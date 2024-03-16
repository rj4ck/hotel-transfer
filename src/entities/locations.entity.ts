export type LocationsTypes = 'IATA' | 'ATLAS' | 'GPS' | 'PORT' | 'STATION'

export interface ILocation {
    code: string;
    type: LocationsTypes;
    description: string;
}

export interface IPickupInformation {
    to: ILocation,
    from: ILocation,
    date: string;
    time: string;
    pickup: {
        zip?: string;
        town?: string;
        number?: string;
        address: string;
        altitude?: string;
        latitude?: string;
        longitude?: string;
        description: string;
        checkPickup: {
            url: string,
            mustCheckPickupTime: boolean,
            hoursBeforeConsulting: number
        },
        image?: string
        pickupId?: string,
        stopName?: string,
    },
}

export interface IAirportTerminals {
    code: string;
    language: string;
    "content": {
        "type": string,
        "description": string
    },
    countryCode: string
}

export interface ICities {
    code: string;
    name: string;
    language: string;
    countryCode: string
}
