import HotelBedsService from "../../../../services/hotel-beds.service";
import { ILocationRequest } from "@/dto/locations.dto";
import { IAirportTerminals } from "@/entities/airport-terminal.entity";

class ListTerminalQuery {
    public static execute (parameters: ILocationRequest): Promise<IAirportTerminals[]> {

        return HotelBedsService.miscellaneous('/locations/terminals', { params: parameters });
    }
}

export default ListTerminalQuery;
