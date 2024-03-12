export type LocationsTypes = 'IATA' | 'ATLAS' | 'GPS' | 'PORT' | 'STATION'
export interface ICountries {
    name: string;
    code: string;
    language: string;
    countryCode: string;
}

export interface ITerminals {
    name: string;
    code: string;
    language: string;
    countryCode: string;
}
