import HotelBedsService from "../../../services/hotel-beds.service";
import { ISearchAvailability } from "../../../entities/search-availability.entity";

class SearchAvailabilityQuery {
    public static execute (parameters: ISearchAvailability) {

        const pathVariables = `${parameters.language}/from/${parameters.fromType}/${parameters.fromCode}/to/${parameters.toType}/${parameters.toCode}/${parameters.outbound}${parameters.inbound ? `/${parameters.inbound}` : ''}/${parameters.adults}/${parameters.children}/${parameters.infants}`

        return HotelBedsService.transfer(`/availability/${pathVariables}`);
    }
}

export default SearchAvailabilityQuery;
