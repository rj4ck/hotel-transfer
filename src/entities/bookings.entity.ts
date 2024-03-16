import { IHolder } from "@/entities/users.entity";

type BookingStatuses = 'CONFIRMED' | 'CANCELLED' | 'MODIFIED';

export interface IBooking {
    reference: string;
    bookingFileId?: string;
    creationDate: string;
    status: BookingStatuses;
    modificationsPolicies: {
        cancellation: boolean;
        modification: boolean;
    },
    holder: IHolder,
    clientReference: string,
    remark?: string;
    invoiceCompany: {
        code: string;
    },
    supplier: {
        name: string;
        vatNumber: string;
    },
    currency: string;
    totalAmount: number;
    pendingAmount: number;
    totalNetAmount: number;
    paymentDataRequired: string;
}
