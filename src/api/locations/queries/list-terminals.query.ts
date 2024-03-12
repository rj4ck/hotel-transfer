import HotelBedsService from "../../../services/hotel-beds.service";
import { ILocationQuery } from "@/entities/locations.entity";

class ListTerminalQuery {
    public static execute (parameters: ILocationQuery) {

        return HotelBedsService.miscellaneous('/locations/terminals', { params: parameters });
    }
}

export default ListTerminalQuery;
