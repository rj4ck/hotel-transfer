import HotelBedsService from "../../../../services/hotel-beds.service";

class GetBookingQuery {
    public static async execute (reference: string) {

        return HotelBedsService.transfer.get(`/bookings/en/reference/${reference}`);

    }
}

export default GetBookingQuery;
