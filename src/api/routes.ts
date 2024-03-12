import express from 'express';
import locationsRoutes from './locations/locations.routes';
import searchAvailability from './search-availability/search-availability.routes';

const api = express();

//app.use('/hotels', hotelsRoutes);
api.use('/search', searchAvailability);
api.use('/locations', locationsRoutes);

api.get('/status', (req, res) => {
	res.status(200).json({ message: 'I am alive' });
});

export default api;
