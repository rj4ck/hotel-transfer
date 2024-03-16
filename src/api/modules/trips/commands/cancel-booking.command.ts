import HotelBedsService from "../../../../services/hotel-beds.service";

class CancelBookingCommand {
    public static execute (reference: string) {

        return HotelBedsService.transfer.delete(`/bookings/en/reference/${reference}?simulation=false`);
    }
}

export default CancelBookingCommand;
