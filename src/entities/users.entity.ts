export interface IHolder {
    name: string;
    email: string;
    phone: string;
    surname: string;
}

export interface IUser  {
    homeLocation: {
        lat: number,
        lon: number,
        city: string,
        country: string,
        countryCode: string
    }
}
