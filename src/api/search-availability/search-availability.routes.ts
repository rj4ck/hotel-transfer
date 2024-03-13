import express from 'express';
import SearchAvailabilityController from './search-availability.controller';

const router = express.Router();

router.post('/', SearchAvailabilityController.search);

export default router;
