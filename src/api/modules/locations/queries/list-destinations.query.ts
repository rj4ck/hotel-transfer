import HotelBedsService from "../../../../services/hotel-beds.service";
import { ILocationRequest, ILocationResponse } from "@/dto/locations.dto";

class ListDestinationsQuery {
    public static execute (parameters: ILocationRequest): Promise<ILocationResponse[]> {

        return HotelBedsService.miscellaneous('/locations/destinations', { params: parameters });
    }
}

export default ListDestinationsQuery;
