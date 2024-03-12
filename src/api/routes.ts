import express from 'express';
import countriesRoutes from './countries/countries.routes';
import terminalsRoutes from './terminals/terminals.routes';

const api = express();

//app.use('/hotels', hotelsRoutes);
api.use('/countries', countriesRoutes);
api.use('/terminals', terminalsRoutes);

api.get('/status', (req, res) => {
	res.status(200).json({ message: 'I am alive' });
});

export default api;
