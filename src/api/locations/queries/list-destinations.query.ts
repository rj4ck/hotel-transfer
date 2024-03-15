import HotelBedsService from "../../../services/hotel-beds.service";
import { ILocationQuery } from "@/entities/locations.entity";

class ListDestinationsQuery {
    public static execute (parameters: ILocationQuery) {

        return HotelBedsService.miscellaneous('/locations/destinations', { params: parameters });
    }
}

export default ListDestinationsQuery;
