import HotelBedsService from "../../../services/hotel-beds.service";
import { IConfirmBookingTransferRequest, IConfirmBookingTransferResponse } from "@/entities/booking.entity";

class ConfirmBookingCommand {
    public static execute (parameters: unknown) {

        return HotelBedsService.transfer.post(`/bookings`, parameters) as IConfirmBookingTransferResponse;

    }
}

export default ConfirmBookingCommand;
