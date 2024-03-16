import HotelBedsService from "../../../../services/hotel-beds.service";
import { IHotels } from "@/entities/hotels.entity";
import { ILocationRequest } from "@/dto/locations.dto";

class ListHotelsQuery {
    public static execute (parameters: ILocationRequest): Promise<IHotels[]> {

        return HotelBedsService.miscellaneous('/hotels', { params: parameters });
    }
}

export default ListHotelsQuery;
