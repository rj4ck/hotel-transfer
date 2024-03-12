import { Request, Response, NextFunction } from 'express';
import ListCountriesQuery from './queries/list-countries.query';

class CountriesController {
    public static async search(req: Request, res: Response, next: NextFunction): Promise<void> {

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

export default CountriesController;
