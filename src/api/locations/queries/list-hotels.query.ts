import HotelBedsService from "../../../services/hotel-beds.service";
import { ILocationQuery } from "@/entities/locations.entity";

class ListHotelsQuery {
    public static execute (parameters: ILocationQuery) {

        return HotelBedsService.miscellaneous('/hotels', { params: parameters });
    }
}

export default ListHotelsQuery;
