import { ICategories, IVehicleImages, IVehicles } from "@/entities/vehicles.entity";

export type TransferType = 'TRAIN' | 'FLIGHT' | 'CRUISE';
export type TransferDirections = 'ARRIVAL' | 'DEPARTURE';
type TransferStatuses = 'CONFIRMED' | 'CANCELLED';

export interface ITransferDetails {
    code: string,
    type: TransferType,
    companyName?: string
    direction: TransferDirections,
}

export interface ITransfers {
    id?: number;
    rateKey: string;
    status?: TransferStatuses;
    transferType?: TransferType;
    transferDetails: ITransferDetails[];
    direction: string;
    vehicle: IVehicles;
    category: ICategories;
    minPaxCapacity: number;
    maxPaxCapacity: number;
    content: {
        vehicle: IVehicles;
        category: ICategories;
        images: IVehicleImages[]
    },
    price: {
        totalAmount: number;
        netAmount: null | number;
        currencyId: string;
    },
    factsheetId: string;
}
