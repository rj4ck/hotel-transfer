export type LocationsTypes = 'IATA' | 'ATLAS' | 'GPS' | 'PORT' | 'STATION'

export interface ILocation {
    city?: string;
    country: string;
    countryCode: string;
}
export interface ICountries {
    name: string;
    code: string;
    language: string;
    countryCode: string;
}

export interface ILocations {
    name: string;
    code: string;
    language: string;
    countryCode: string;
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

export interface IHotels {
    code: string;
    name: string;
    city: string;
    address: string;
    category: string;
    description: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
    language: string;
    countryCode: string;
    destinationCode: string;

}
