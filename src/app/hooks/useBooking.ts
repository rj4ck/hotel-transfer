import React from "react";
import { IBooking, IPickupInformation, ITransfers } from "@/entities";
import createApiClient from "@/utils/internal-request";
import { toast } from "react-toastify";

interface ITransferData extends ITransfers {
    pickupInformation: IPickupInformation;
}
interface IBookingData extends IBooking {
    transfers: ITransferData[]
}
export interface IUseBooking {
    bookingDetail?: IBookingData;
    isLoadingBooking: boolean;
    handleCancelBooking: (reference: string) => void;
    handleSearchBooking: (reference: string) => void;
    handleConfirmBooking: (payload: unknown) => void;
}

const useBooking = (): IUseBooking => {
    const [isLoadingBooking, setIsLoadingBooking] = React.useState(false);
    const [bookingDetail, setBookingDetail] = React.useState<IBookingData>();

    const handleConfirmBooking = async (payload: unknown) => {
        try {
            setIsLoadingBooking(true);
            const data = await createApiClient('trips/bookings').post(payload)

            setBookingDetail(data)
        } finally {
            setIsLoadingBooking(false)
        }
    }

    const handleSearchBooking = async (reference: string) => {
        try {
            setIsLoadingBooking(true);

            const { bookings } = await createApiClient(`trips/bookings/${reference}`).get()

            setBookingDetail(bookings[0])
        } finally {
            setIsLoadingBooking(false)
        }
    }

    const handleCancelBooking = async (reference: string) => {
        try {
            setIsLoadingBooking(true);

            const data = await createApiClient(`trips/bookings/${reference}`).delete()

            toast.success(data.message)
            setBookingDetail(undefined)

        } finally {
            setIsLoadingBooking(false)
        }
    }

    return {
        bookingDetail,
        isLoadingBooking,
        handleCancelBooking,
        handleSearchBooking,
        handleConfirmBooking
    }
}

export default useBooking;
