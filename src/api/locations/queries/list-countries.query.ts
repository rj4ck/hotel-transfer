import HotelBedsService from "../../../services/hotel-beds.service";
import { ILocationQuery } from "@/entities/locations.entity";

class ListCountriesQuery {
    public static execute (parameters: ILocationQuery) {

        return HotelBedsService.miscellaneous('/locations/countries', { params: parameters });
    }
}

export default ListCountriesQuery;
