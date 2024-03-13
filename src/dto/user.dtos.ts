export interface IUser {
    homeLocation: {
        lat: number,
        lon: number,
        city: string,
        country: string,
        countryCode: string
    }
}

export interface ITerminals {
    name: string;
    code: string;
    language: string;
    countryCode: string;
}
