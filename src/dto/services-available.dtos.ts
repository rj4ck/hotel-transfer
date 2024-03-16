import { IVehicleImages } from "@/dto/vehicles.dtos";

export interface IServicesAvailable {
    id: string;
    rateKey: string;
    direction: string;
    transferType: string;
    vehicle: {
        name: string;
        code: string;
    };
    category: {
        name: string;
        code: string;
    };
    minPaxCapacity: number;
    maxPaxCapacity: number;
    content: {
        vehicle: {
            name: string;
            code: string;
        };
        category: {
            name: string;
            code: string;
        };
        images: IVehicleImages[]
    },
    price: {
        totalAmount: number;
        netAmount: null | number;
        currencyId: string;
    },
    factsheetId: string;

}
