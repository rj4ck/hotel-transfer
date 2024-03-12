import HotelBedsService from "../../../services/hotel-beds.service";

class ListCountriesQuery {
    public static execute (parameters: any) {

        return HotelBedsService.miscellaneous('/locations/countries', { params: parameters });
    }
}

export default ListCountriesQuery;
