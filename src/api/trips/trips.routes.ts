import express from 'express';
import TripsController from './trips.controller';

const router = express.Router();

router.get('/current-user', TripsController.currentUser);

export default router;
