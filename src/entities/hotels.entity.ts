import { IPassage } from './passagers.entity';

export interface IHotel {
    code: number;
    name: string;
    categoryCode: string;
    categoryName: string;
}

export interface ISearchHotelQuery {
    stay: {
        checkIn: string;
        checkOut: string;
        shiftDays?: number
        allowOnlyShift?: boolean
    },
    geolocation: {
        latitude: string;
        longitude: string;
        units?: string;
        radius?: number;
        secondaryLatitude?: string;
        secondaryLongitude?: string;
    };
    occupancies: IPassage[]
}

export interface ISearchHotelResponse {
    'auditData': {
        'token': string,
        'timestamp': string,
    },
    'hotels': {
        'total': number,
        'checkIn': string,
        'checkOut': string
        'hotels': IHotel[],
    }
}
