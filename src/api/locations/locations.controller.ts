import { Request, Response, NextFunction } from 'express';
import ListTerminalQuery from "./queries/list-terminals.query";
import ListCountriesQuery from './queries/list-countries.query';

class LocationsController {
    public static async search(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            const payload = {
                fields: 'ALL',
                language: 'es'
            }

            const terminals = await ListTerminalQuery.execute(payload);
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

            const countries = await ListCountriesQuery.execute(payload);

            res.status(200).json(countries);

        } catch (error) {
            next(error);
        }
    }
}

export default LocationsController;
