import HotelBedsService from "../../../../services/hotel-beds.service";
import { IConfirmBookingTransferRequest, IConfirmBookingTransferResponse } from "@/dto/booking.dto";

class ConfirmBookingCommand {
    public static async execute (parameters: IConfirmBookingTransferRequest): Promise<IConfirmBookingTransferResponse> {

        return HotelBedsService.transfer.post(`/bookings`, parameters);

    }
}

export default ConfirmBookingCommand;
