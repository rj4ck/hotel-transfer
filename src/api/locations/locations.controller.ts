import { Request, Response, NextFunction } from 'express';
import ListHotelsQuery from "./queries/list-hotels.query";
import ListCountriesQuery from './queries/list-countries.query';
import ListTerminalsQuery from "./queries/list-terminals.query";
import ListDestinationsQuery from "./queries/list-destinations.query";

class LocationsController {
    public static async search(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            const payload = {
                fields: 'ALL',
                language: 'es'
            }

            const terminals = await ListTerminalsQuery.execute(payload);
            const countries = await ListCountriesQuery.execute(payload);

            res.status(200).json({
                countries,
                terminals
            });

        } catch (error) {
            next(error);
        }
    }
    public static async fetchCountries(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {

            const payload = {
                fields: 'ALL',
                language: 'es'
            }

            const countries = await ListDestinationsQuery.execute(payload);

            res.status(200).json(countries);

        } catch (error) {
            next(error);
        }
    }
    public static async fetchDestinations(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            const { countryCode = 'HN' } = req.query

            const payload = {
                fields: 'ALL',
                language: 'en',
                ...(countryCode ? { countryCodes: countryCode } : {})
            }

            const terminals = await ListDestinationsQuery.execute(payload);

            res.status(200).json(terminals);

        } catch (error) {
            next(error);
        }
    }
    public static async fetchAirportTerminals(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            const { countryCode = 'HN' } = req.query

            const payload = {
                fields: 'ALL',
                language: 'en',
                ...(countryCode ? { countryCodes: countryCode } : {})
            }

            const terminals = await ListTerminalsQuery.execute(payload);

            res.status(200).json(terminals);

        } catch (error) {
            next(error);
        }
    }

    public static async fetchHotels(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            const { countryCode = 'HN', cityCode } = req.query

            const payload = {
                fields: 'ALL',
                language: 'en',
                ...(cityCode ? { destinationCodes: cityCode } : {}),
                ...(countryCode ? { countryCodes: countryCode } : {}),
            }

            const hotels = await ListHotelsQuery.execute(payload);

            res.status(200).json(hotels);

        } catch (error) {
            next(error);
        }
    }
}

export default LocationsController;
