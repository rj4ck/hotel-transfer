import express from 'express';
import TripsController from './trips.controller';

const router = express.Router();

router.get('/current-user', TripsController.currentUser);
router.post('/booking', TripsController.confirmBookingTransfer);

export default router;
