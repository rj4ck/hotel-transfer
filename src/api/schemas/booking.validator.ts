import * as yup from 'yup';
import { TransferType, TransferDirections } from "@/entities";

export default yup.object({
    body: yup.object({
        rateKey: yup.string().required("rateKey' is a required field."),
        lastName: yup.string().required("lastName' is a required field."),
        firstName: yup.string().required("firstName' is a required field."),
        phoneNumber: yup.string().required("phoneNumber' is a required field."),
        email: yup.string().email().required("email' is a required field."),
        flightReference: yup.string().required("flightReference' is a required field."),
        direction: yup.mixed<TransferDirections>().oneOf(['ARRIVAL', 'DEPARTURE']).required("direction' is a required field."),
        //transferType: yup.mixed<TransferType>().oneOf([ 'TRAIN', 'FLIGHT', 'CRUISE']).required("transferType' is a required field."),
    })
})

