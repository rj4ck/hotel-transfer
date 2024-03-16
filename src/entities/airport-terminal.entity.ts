export interface IAirportTerminals {
    code: string;
    name: string;
    language: string;
    countryCode: string;
    content: {
        type: string
        description: string;
    };
    coordinates: {
        latitude: number | null;
        longitude: number | null;
    }
}
