import express from 'express';
import LocationsController from './locations.controller';

const router = express.Router();

router.get('/', LocationsController.search);
router.get('/hotels', LocationsController.fetchHotels);
router.get('/countries', LocationsController.fetchCountries);
router.get('/destinations', LocationsController.fetchDestinations);
router.get('/airport-terminals', LocationsController.fetchAirportTerminals);

export default router;
