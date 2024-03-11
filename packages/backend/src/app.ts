import cors from 'cors';
import path from 'path';
import logger from 'morgan';
import express, { NextFunction, Request, Response } from 'express';

import apiRoutes from './modules/routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

app.use(express.static(path.join(__dirname, '_next')));

app.use('/api', apiRoutes);

console.log(__dirname);

app.get('/', (req: Request, res: Response) => {
	res.sendFile(path.join(__dirname, '.next/server/app/index.html'));
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	//console.error(err);
	res.status(400).json(err);
});

export default app;
