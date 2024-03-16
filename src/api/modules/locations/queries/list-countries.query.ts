import HotelBedsService from "../../../../services/hotel-beds.service";
import { ILocationRequest, ILocationResponse } from "@/dto/locations.dto";

class ListCountriesQuery {
    public static execute (parameters: ILocationRequest): Promise<ILocationResponse[]> {

        return HotelBedsService.miscellaneous('/locations/countries', { params: parameters });
    }
}

export default ListCountriesQuery;
