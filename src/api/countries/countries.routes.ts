import express from 'express';
import CountriesController from './countries.controller';

const router = express.Router();

router.get('/', CountriesController.search);

export default router;
