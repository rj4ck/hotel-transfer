import express from 'express';
import HotelController from './hotel.controller';

const router = express.Router();

router.get('/search', HotelController.search);

export default router;
