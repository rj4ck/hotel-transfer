import express from 'express';
import HotelController from './hotel.controller';

const router = express.Router();

router.post('/search', HotelController.search);

export default router;
