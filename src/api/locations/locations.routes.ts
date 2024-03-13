import express from 'express';
import LocationsController from './locations.controller';

const router = express.Router();

router.get('/', LocationsController.search);
router.get('/countries', LocationsController.fetchCountries);

export default router;
