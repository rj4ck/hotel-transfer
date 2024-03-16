export interface IHotels {
    code: string;
    name: string;
    category: string;
    description: string;
    countryCode: string;
    destinationCode: string;
    city: string;
    coordinates: {
        latitude: number;
        longitude: number;
    },
    address: string;
}
