import * as yup from 'yup';
import { TransferType, TransferDirections } from "@/entities";

export default yup.object({
    body: yup.object({
        toCode: yup.string().required("toCode' is a required field."),
        fromCode: yup.string().required("fromCode' is a required field."),
        outbound: yup.string().required("outbound' is a required field."),
        adults: yup.number().min(1).required("adults' is a required field."),
        infants: yup.number().min(0).required("infants' is a required field."),
        children: yup.number().min(0).required("children' is a required field."),
        inbound: yup.string(),
        direction: yup.mixed<TransferDirections>().oneOf(['ARRIVAL', 'DEPARTURE']).required("direction' is a required field."),
        transferType: yup.mixed<TransferType>().oneOf([ 'TRAIN', 'FLIGHT', 'CRUISE']).required("transferType' is a required field.")
    })
})
