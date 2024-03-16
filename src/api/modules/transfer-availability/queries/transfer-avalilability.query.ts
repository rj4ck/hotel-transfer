import HotelBedsService from "../../../../services/hotel-beds.service";
import { IServiceAvailableRequest, IServiceAvailableResponse } from "@/dto/transfer-availability.dto";

class SearchAvailabilityQuery {
    public static async execute (parameters: IServiceAvailableRequest) {

        const pathVariables = `${parameters.language}/from/${parameters.fromType}/${parameters.fromCode}/to/${parameters.toType}/${parameters.toCode}/${parameters.outbound}${parameters.inbound ? `/${parameters.inbound}` : ''}/${parameters.adults}/${parameters.children}/${parameters.infants}`

        const { services } = await HotelBedsService.transfer(`/availability/${pathVariables}`) as IServiceAvailableResponse;

        return services;
    }
}

export default SearchAvailabilityQuery;
