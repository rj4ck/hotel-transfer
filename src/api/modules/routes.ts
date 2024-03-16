import express from 'express';
import tripsRoutes from "./trips/trips.routes";
import locationsRoutes from './locations/locations.routes';
import searchAvailability from './transfer-availability/transfer-availability.routes';

const api = express();

api.use('/trips', tripsRoutes);
api.use('/locations', locationsRoutes);
api.use('/transfers', searchAvailability);

api.get('/status', (req, res) => {
	res.status(200).json({ message: 'I am alive' });
});

export default api;
