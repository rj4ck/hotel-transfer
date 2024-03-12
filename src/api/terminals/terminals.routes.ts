import express from 'express';
import TerminalsController from './terminals.controller';

const router = express.Router();

router.get('/', TerminalsController.search);

export default router;
