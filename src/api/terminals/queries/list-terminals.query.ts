import HotelBedsService from "../../../services/hotel-beds.service";

class ListTerminalsQuery {
    public static execute (parameters: any) {

        return HotelBedsService.miscellaneous('/locations/terminals', { params: parameters });
    }
}

export default ListTerminalsQuery;
