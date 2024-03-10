import cors from 'cors';
import logger from 'morgan';
import express, { NextFunction, Request, Response } from 'express';

import hotelsRoutes from './modules/hotels/hotel.routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

app.get('/', (req: Request, res: Response) => {
	res.send('Express + TypeScript Server');
});

app.use('/hotels', hotelsRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	//console.error(err);
	res.status(400).json(err);
});

export default app;
