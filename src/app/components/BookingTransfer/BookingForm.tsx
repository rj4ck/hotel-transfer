import React from "react";
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import Input from "@/app/components/Input";
import ModalDialog from "@/app/components/Modal";
import LoadingMessage from "@/app/components/LoadingMessage";

interface IBookingForm {
    rateKey: string;
    direction: string;
    isLoading: boolean;
    //transferType: string;
    onSubmit: (p: { [p: string]: unknown; rateKey: string; direction: string }) => void;
}

const bookingSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Is a required field'),
    lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Is a required field'),
    email: Yup.string().email('Invalid email').required('Is a required field'),
    phoneNumber: Yup.string().required('Is a required field'),
    flightReference: Yup.string().max(7).required('Is a required field'),
});

const initialValues = {
    email: '',
    lastName: '',
    firstName: '',
    phoneNumber: '',
    flightReference: '',

}
const BookingForm: React.FC<IBookingForm> = ({ rateKey, direction, onSubmit, isLoading = false }) => {

    return (
        <ModalDialog submitButton={'Submit'} title={'Booking'}
                     className={'h-12 w-full rounded-md bg-orange-500 hover:bg-orange-700 flex items-center justify-center text-neutral-50 focus:outline-none'}>

            {isLoading && <LoadingMessage message={'Booking transfer...'} /> }

            {!isLoading && <Formik
                initialValues={initialValues}
                validationSchema={bookingSchema}
                onSubmit={values => {
                    // same shape as initial values
                    onSubmit({ ...values, rateKey, direction });
                }}>

                {({ errors, touched }) => (
                    <Form>
                        <Input label={'First name'} placeholder={'First name'} id={'firstName'} error={ errors.firstName && touched.firstName ? errors.firstName : ''} />

                        <Input label={'Last name'} placeholder={'Last name'} id={'lastName'} error={errors.lastName && touched.lastName ? errors.lastName : ''} />

                        <Input label={'Email'} placeholder={'Email'} id={'email'} error={errors.email && touched.email ? errors.email : ''} />

                        <Input label={'Phone number'} placeholder={'Phone number'} id={'phoneNumber'} error={errors.phoneNumber && touched.phoneNumber ? errors.phoneNumber : ''} />

                        <Input label={'Flight reference'} placeholder={'Flight reference'} id={'flightReference'} error={errors.flightReference && touched.flightReference ? errors.flightReference : ''}/>

                        <div className={'border-b border-neutral-700'}/>

                        <div className="mt-4">
                            <button type="submit" className={'h-12 w-full rounded-md bg-orange-500 hover:bg-orange-700 flex items-center justify-center text-neutral-50 focus:outline-none'}>
                                Submit
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>}

        </ModalDialog>

    )
}

export default BookingForm
