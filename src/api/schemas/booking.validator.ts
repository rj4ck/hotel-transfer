import * as yup from 'yup';
import { TransferType, TransferDirections } from "@/entities";

export default yup.object().shape({
    rateKey: yup.string().required(),
    lastName: yup.string().required(),
    firstName: yup.string().required(),
    phoneNumber: yup.string().required(),
    email: yup.string().email().required(),
    flightReference: yup.string().required(),
    direction: yup.mixed<TransferDirections>().oneOf(['ARRIVAL', 'DEPARTURE']),
    transferType: yup.mixed<TransferType>().oneOf([ 'TRAIN', 'FLIGHT', 'CRUISE']),
})
