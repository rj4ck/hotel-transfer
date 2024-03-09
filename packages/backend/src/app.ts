import express, { Request, Response } from 'express';
import hotelsRoutes from './modules/hotels/hotel.routes';

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
	res.send('Express + TypeScript Server');
});

app.use('/hotels', hotelsRoutes);

export default app;
