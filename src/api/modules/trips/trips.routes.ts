import express from 'express';
import TripsController from './trips.controller';
import bookingValidator from '../../schemas/booking.validator'
import validateMiddleware from "../../middlewares/validate-request";

const router = express.Router();

router.get('/current-user', TripsController.currentUser);
router.post('/bookings', validateMiddleware(bookingValidator), TripsController.confirmBookingTransfer);
router.get('/bookings/:reference', TripsController.getBookingTransfer);
router.delete('/bookings/:reference', TripsController.cancelBookingTransfer);

export default router;
