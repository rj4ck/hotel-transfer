import express from 'express';
import LocationsController from './locations.controller';

const router = express.Router();

router.get('/', LocationsController.search);

export default router;
