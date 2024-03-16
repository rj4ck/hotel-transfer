import React from "react";
import { Field } from "formik";

interface IInputProp {
    id: string;
    type?: string;
    label: string;
    error?: string;
    placeholder: string;
}
const Input: React.FC<IInputProp> = ({ id, type = 'text', label, error, placeholder }) => {
    return (
        <div className={'mb-4'}>
            <label htmlFor={id} className="block text-xs font-medium text-black dark:text-white">
                {label}
            </label>

            <Field name={id} type={type} id={id} placeholder={placeholder} className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm text-black"/>

            {error && <span className={'font-thin text-red-500'}>{error}</span>}
        </div>
    )
}

export default Input;
