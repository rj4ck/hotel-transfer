import express from 'express';
import validateMiddleware from "../../middlewares/validate-request";
import TransferAvailabilityController from './transfer-availability.controller';
import transferAvailability from "../../schemas/transfer-availability.validator";

const router = express.Router();

router.post('/', validateMiddleware(transferAvailability), TransferAvailabilityController.search);

export default router;
