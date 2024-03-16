import HotelBedsService from "../../../../services/hotel-beds.service";
import { IBooking } from "@/entities";
import { IConfirmBookingTransferRequest, IConfirmBookingTransferResponse } from "@/dto/booking.dto";

class ConfirmBookingCommand {
    public static async execute (parameters: IConfirmBookingTransferRequest): Promise<IBooking> {

        const response = await HotelBedsService.transfer.post(`/bookings`, parameters);

        const { bookings } = response as unknown as IConfirmBookingTransferResponse

        return bookings[0]
    }
}

export default ConfirmBookingCommand;
