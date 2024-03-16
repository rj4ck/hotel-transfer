import express from 'express';
import TripsController from './trips.controller';
import validateMiddleware from "../../middlewares/validate-request";
import bookingValidator from '../../schemas/booking.validator'

const router = express.Router();

router.get('/current-user', TripsController.currentUser);
router.post('/bookings', validateMiddleware(bookingValidator), TripsController.confirmBookingTransfer);

export default router;
